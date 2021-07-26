import { createServer } from "http";

const port = process.env.PORT || 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`<h1>Hello from server!</h1>`);
});

server.listen(port, () => {
  console.log(`Server running at port ${port} / mode: ${process.env.NODE_ENV}`);
});
