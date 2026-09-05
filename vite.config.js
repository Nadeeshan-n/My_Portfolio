import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function adminApiPlugin() {
  const handlerMiddleware = async (req, res, next) => {
    const url = new URL(req.url || '/', 'http://localhost:3000');
    if (url.pathname === '/api/admin/publish' || url.pathname === '/api/publish') {
      try {
        const { default: handler } = await import('./api/admin/publish.mjs');
        if (req.method === 'POST') {
          let raw = '';
          req.on('data', (chunk) => {
            raw += chunk;
          });
          req.on('end', async () => {
            try {
              req.body = raw ? JSON.parse(raw) : {};
              await handler(req, res);
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify({ error: err.message || 'Server error' }));
            }
          });
          return;
        }
        await handler(req, res);
        return;
      } catch (err) {
        console.error('API middleware error:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ error: err.message || 'Server error' }));
        return;
      }
    }
    next();
  };

  return {
    name: 'admin-publish-api',
    configureServer(server) {
      server.middlewares.use(handlerMiddleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handlerMiddleware);
    },
  };
}

export default defineConfig({
  plugins: [react(), adminApiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: 'all',
  },
});