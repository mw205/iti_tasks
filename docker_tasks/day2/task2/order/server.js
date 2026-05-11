const http = require("http");
const { pool, init } = require("./db");

const PORT = 3000;

init().then(() => {
  console.log("DB initialized");
});

const server = http.createServer(async (req, res) => {
  // POST /api/order
  if (req.method === "POST" && req.url === "/api/order") {
    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { item, quantity } = JSON.parse(body);

        const result = await pool.query(
          "INSERT INTO orders (item, quantity) VALUES ($1, $2) RETURNING *",
          [item, quantity]
        );

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result.rows[0]));
      } catch (err) {
        res.writeHead(400);
        res.end("Invalid request");
      }
    });
  }

  // GET /api/order
  else if (req.method === "GET" && req.url === "/api/order") {
    const result = await pool.query("SELECT * FROM orders");

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result.rows));
  }

  // Not found
  else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
