// Stand-in for api.resend.com during tests, so the real route runs without sending mail.
// POST /emails records the payload; GET /__emails returns everything recorded.
import { createServer } from "node:http";

const port = Number(process.env.MOCK_RESEND_PORT ?? 3101);
const emails = [];

createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    res.setHeader("content-type", "application/json");
    if (req.method === "POST" && req.url === "/emails") {
      const email = JSON.parse(body);
      emails.push(email);
      res.end(JSON.stringify({ id: `mock-${emails.length}` }));
    } else if (req.method === "GET" && req.url === "/__emails") {
      res.end(JSON.stringify(emails));
    } else if (req.method === "GET" && req.url === "/") {
      res.end("{}");
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "not found" }));
    }
  });
}).listen(port, () => console.log(`mock resend on :${port}`));
