const http = require("http");

const port = process.env.PORT || 3000;
const message = process.env.MESSAGE || "Hello ITI";

http
  .createServer((req, res) => {
    res.end(message + "\n");
  })
  .listen(port);
