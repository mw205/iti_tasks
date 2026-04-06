import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

process.loadEnvFile();

const TARGET_URL = process.env.AUTOMATION_URL || "https://www.bbc.com";
const SCREENSHOT_PATH = path.resolve("screenshot.jpg");
const GEMINI_MODEL = "gemini-2.0-flash"; // Updated to match server.js or stay as is, but 2.0-flash is standard now.
const apiKey = process.env.GEMINI_API_KEY;

async function run() {
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in .env");
  }

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1440, height: 2200 },
  });

  try {
    const page = await browser.newPage();

    await page.goto(TARGET_URL, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Dismiss cookie banner if it exists
    const phrases = [
      "accept",
      "accept all",
      "agree",
      "i agree",
      "got it",
      "close",
      "ok",
      "okay",
      "continue",
    ];

    const clicked = await page.evaluate((candidatePhrases) => {
      const selectors = [
        "button",
        "[role='button']",
        "input[type='button']",
        "input[type='submit']",
        "a",
      ];

      const elements = Array.from(document.querySelectorAll(selectors.join(",")));

      const isVisible = (element) => {
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.visibility !== "hidden" &&
          style.display !== "none" &&
          rect.width > 0 &&
          rect.height > 0
        );
      };

      for (const element of elements) {
        const text = (
          element.innerText ||
          element.textContent ||
          element.value ||
          ""
        )
          .trim()
          .toLowerCase();

        if (!text || !isVisible(element)) {
          continue;
        }

        if (candidatePhrases.some((phrase) => text.includes(phrase))) {
          element.click();
          return text;
        }
      }

      return null;
    }, phrases);

    if (clicked) {
      await new Promise(r => setTimeout(r, 1000));
      console.log(`Dismissed cookie banner using: "${clicked}"`);
    }

    await page.screenshot({
      path: SCREENSHOT_PATH,
      type: "jpeg",
      quality: 85,
      fullPage: true,
    });

    const menuItems = await extractHeaderMenuItems(page);
    const pageDescription = await analyzeScreenshotWithGemini(SCREENSHOT_PATH);

    console.log(`URL: ${TARGET_URL}`);
    console.log("\nHeader menu items:");
    if (menuItems.length === 0) {
      console.log("- No header items found");
    } else {
      for (const item of menuItems) {
        console.log(`- ${item}`);
      }
    }

    console.log("\nGemini page description:");
    console.log(pageDescription);
  } finally {
    await browser.close();
  }
}

async function extractHeaderMenuItems(page) {
  return page.evaluate(() => {
    const header =
      document.querySelector("header") ||
      document.querySelector('[role="banner"]') ||
      document.body;

    const nav =
      header.querySelector("nav") ||
      header.querySelector('[role="navigation"]') ||
      header;

    const rawItems = Array.from(nav.querySelectorAll("a, button"))
      .map((element) => element.textContent?.trim() || "")
      .filter(Boolean)
      .filter((text) => text.length <= 40);

    return [...new Set(rawItems)].slice(0, 20);
  });
}

async function analyzeScreenshotWithGemini(filePath) {
  const base64Image = fs.readFileSync(filePath, { encoding: "base64" });

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image,
              },
            },
            {
              text: "Describe the visible sections of this homepage briefly. Focus on layout, navigation, hero area, cards, banners, and major content regions.",
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No description returned.";
}

run().catch((error) => {
  console.error("Automation failed:", error);
  process.exitCode = 1;
});
