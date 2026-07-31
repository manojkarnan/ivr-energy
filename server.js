const path = require('path');
const fs = require('fs');
const http = require('http');

// Set production environment variables
process.env.NODE_ENV = 'production';

// Port and Hostname config
const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

// Check if standalone build exists
const standaloneDir = path.join(__dirname, '.next', 'standalone');
const serverPath = path.join(standaloneDir, 'server.js');

if (!fs.existsSync(serverPath)) {
  console.error('Error: Next.js standalone build not found! Run "npm run build" first.');
  process.exit(1);
}

// Monkeypatch http.createServer to intercept requests and serve static files from the public folder
const originalCreateServer = http.createServer;
http.createServer = function (requestListener) {
  const customListener = (req, res) => {
    let pathname = '';
    try {
      const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      pathname = decodeURIComponent(parsedUrl.pathname);
    } catch {
      pathname = req.url.split('?')[0];
    }

    // Serve static files from root public, standalone public or .next/static directory
    let filePath;
    if (pathname.startsWith('/_next/static/')) {
      filePath = path.join(__dirname, '.next', 'static', pathname.replace('/_next/static/', ''));
    } else {
      filePath = path.join(__dirname, 'public', pathname);
    }

    const serveFile = (targetPath) => {
      const ext = path.extname(targetPath).toLowerCase();
      let contentType = 'application/octet-stream';
      if (ext === '.webp') contentType = 'image/webp';
      else if (ext === '.png') contentType = 'image/png';
      else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      else if (ext === '.svg') contentType = 'image/svg+xml';
      else if (ext === '.css') contentType = 'text/css';
      else if (ext === '.js') contentType = 'application/javascript';
      else if (ext === '.json') contentType = 'application/json';
      else if (ext === '.ico') contentType = 'image/x-icon';

      res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=31536000, immutable' });
      fs.createReadStream(targetPath).pipe(res);
    };

    fs.stat(filePath, (err, stats) => {
      if (!err && stats.isFile()) {
        serveFile(filePath);
        return;
      }

      // Fallback check for standalone public folder (where runtime uploads are saved)
      if (!pathname.startsWith('/_next/static/')) {
        const fallbackPath = path.join(__dirname, '.next', 'standalone', 'public', pathname);
        fs.stat(fallbackPath, (err2, stats2) => {
          if (!err2 && stats2.isFile()) {
            serveFile(fallbackPath);
            return;
          }
          requestListener(req, res);
        });
      } else {
        requestListener(req, res);
      }
    });
  };

  return originalCreateServer.call(http, customListener);
};

// Start the standalone Next.js server
require(serverPath);
