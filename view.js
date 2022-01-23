const { readFileSync } = require('fs')
const http = require('http');

const hostname = '127.0.0.1'
let port = (process.argv.length > 2 ? parseInt(process.argv[2]) : 80)
if (isNaN(port)) port = 80

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  try {
    const content = readFileSync(
      req.url.length === 1
        ? 'ui.html'
        : `.${req.url}`
    )
    res.end(content);
  } catch (ex) {}
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});