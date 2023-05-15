const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://org-chat-api.onrender.com',
      changeOrigin: true,
    })
  );
};