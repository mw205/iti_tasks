const http = require("http");
const fs = require("fs");
const path = require("path");

process.loadEnvFile();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const apiKey = process.env.GEMINI_API_KEY;
const huggingFaceToken = process.env.HF_TOKEN;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY in .env");
}

const rootDir = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/chat/stream") {
      await handleChatStreamRequest(req, res);
      return;
    }

    if (req.method === "POST" && req.url === "/api/chat") {
      await handleChatRequest(req, res);
      return;
    }

    if (req.method !== "GET") {
      sendJson(res, 405, { error: "Method not allowed" });
      return;
    }

    serveStaticFile(req, res);
  } catch (error) {
    console.error("Server error:", error);
    sendJson(res, 500, { error: "Internal server error" });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

async function handleChatRequest(req, res) {
  const body = await readJsonBody(req);
  const conversationHistory = body?.conversationHistory;
  const model = body?.model || "gemini-2.0-flash";
  const mode = body?.mode || "text";
  const isHuggingFaceImageModel =
    typeof model === "string" &&
    (model.includes("stable-diffusion-xl-base-1.0") ||
      model.includes("hf-flux-schnell-image"));

  if (!Array.isArray(conversationHistory) || conversationHistory.length === 0) {
    sendJson(res, 400, { error: "Conversation history is required." });
    return;
  }

  try {
    if (mode === "image" || isHuggingFaceImageModel) {
      const imagePayload =
        await generateImageWithHuggingFace(conversationHistory);
      sendJson(res, 200, imagePayload);
      return;
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: conversationHistory,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const replyText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I could not generate a response.";

    sendJson(res, 200, {
      reply: replyText,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    sendJson(res, 502, {
      error: error?.message || "Failed to get a response from Gemini.",
    });
  }
}

async function handleChatStreamRequest(req, res) {
  const body = await readJsonBody(req);
  const conversationHistory = body?.conversationHistory;
  const model = body?.model || "gemini-2.0-flash";

  if (!Array.isArray(conversationHistory) || conversationHistory.length === 0) {
    sendJson(res, 400, { error: "Conversation history is required." });
    return;
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: conversationHistory,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Gemini stream API error: ${response.status} ${errorText}`,
      );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const jsonStr = line.replace(/^data: /, "");
            const data = JSON.parse(jsonStr);
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              res.write(
                `data: ${JSON.stringify({ type: "chunk", text: text })}\n\n`,
              );
            }
          } catch (e) {
            console.error("Error parsing stream chunk:", e);
          }
        }
      }
    }

    res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Gemini stream error:", error);
    res.write(
      `data: ${JSON.stringify({ type: "error", error: "Failed to stream response from Gemini." })}\n\n`,
    );
    res.end();
  }
}

function serveStaticFile(req, res) {
  const requestedPath = req.url === "/" ? "/index.html" : req.url;
  const normalizedPath = path
    .normalize(requestedPath)
    .replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(rootDir, normalizedPath);

  if (!filePath.startsWith(rootDir)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      if (error.code === "ENOENT") {
        sendJson(res, 404, { error: "Not found" });
        return;
      }

      throw error;
    }

    const extension = path.extname(filePath);
    res.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
    });
    res.end(data);
  });
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;

      if (data.length > 1e6) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(new Error("Invalid JSON body"));
      }
    });

    req.on("error", reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(payload));
}

async function generateImageWithHuggingFace(conversationHistory) {
  if (!huggingFaceToken) {
    throw new Error("Missing HF_TOKEN for Hugging Face image generation.");
  }

  const prompt = extractLatestUserPrompt(conversationHistory);
  if (!prompt) {
    throw new Error("A text prompt is required for image generation.");
  }

  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${huggingFaceToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const arrayBuffer = await response.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");

  return {
    reply: `Generated image for: ${prompt}`,
    generatedImages: [
      {
        id: `generated-${Date.now()}`,
        name: "flux-generated-image.png",
        type: response.headers.get("content-type") || "image/png",
        isImage: true,
        previewUrl: `data:${response.headers.get("content-type") || "image/png"};base64,${base64Image}`,
      },
    ],
  };
}

function extractLatestUserPrompt(conversationHistory) {
  for (let index = conversationHistory.length - 1; index >= 0; index -= 1) {
    if (conversationHistory[index].role === "user") {
      const textPart = conversationHistory[index].parts?.find(
        (part) => typeof part.text === "string" && part.text.trim(),
      );
      return textPart?.text?.trim() || "";
    }
  }

  return "";
}
