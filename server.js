const http = require("http");
const fs = require("fs");
const path = require("path");
const { incrementVisitors, getVisitorCount } = require("./counter");

const PORT = 3000;

const server = http.createServer((req, res) => {

  if (req.url === "/" || req.url === "/home") {

    incrementVisitors();
    const visitorCount = getVisitorCount();

    const filePath = path.join(__dirname, "pages", "home.html");

    fs.readFile(filePath, "utf8", (err, data) => {

      const updatedPage = data.replace("{{visitorCount}}", visitorCount);

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(updatedPage);

    });

  } 
  else if (req.url === "/about") {

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About page route is set up.");

  } 
  else if (req.url === "/faq") {

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("FAQ page route is set up.");

  } 
  else {

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");

  }

});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

