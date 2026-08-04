const http = require('http');
const { readFile } = require('fs');
const path = require('path');

const root = path.join(__dirname, 'dist');
const port = Number(process.env.PORT || 4173);
const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
};

function sendFile(response, file) {
  readFile(file, (error, content) => {
    if (error) {
      // SPA fallback: serve index.html for unknown routes
      readFile(path.join(root, 'index.html'), (err2, html) => {
        if (err2) {
          response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          response.end('Page introuvable');
          return;
        }
        response.writeHead(200, { 'Content-Type': types['.html'] || 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
        response.end(html);
      });
      return;
    }

    response.writeHead(200, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    response.end(content);
  });
}

http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requested = decodeURIComponent(url.pathname);
  // Strip the /Olympius/ base prefix if present
  const stripped = requested.replace(/^\/Olympius/, '');
  const relative = stripped === '/' || stripped === '' ? 'index.html' : stripped.replace(/^\/+/, '');
  const file = path.resolve(root, relative);

  if (!file.startsWith(root)) {
    response.writeHead(403);
    response.end();
    return;
  }

  sendFile(response, file);
}).listen(port, () => {
  console.log(`Olympius est prêt sur http://localhost:${port}/Olympius/`);
});
