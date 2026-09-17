const http = require('http');
const fs = require('fs');
const path = require('path');

let currentPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  let cleanUrl = req.url.split('?')[0];
  let filePath = path.join(__dirname, cleanUrl === '/' ? 'index.html' : cleanUrl);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    if (req.method === 'HEAD') {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end();
      return;
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

function startServer(port) {
  server.listen(port, '0.0.0.0', () => {
    console.log(`\n=================================================`);
    console.log(`  वेबसाइट लोकल सर्वर चालू है (Server Active) `);
    console.log(`  URL: http://localhost:${port}`);
    console.log(`=================================================\n`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    currentPort += 1;
    console.log(`Port busy, attempting port ${currentPort}...`);
    setTimeout(() => {
      startServer(currentPort);
    }, 200);
  } else {
    console.error('Server error:', err);
  }
});

startServer(currentPort);
