require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // This is the API endpoint after the proxy.
    createProxyMiddleware({
      target: 'https://us-west-2.aws.data.mongodb-api.com', // The endpoint you want to proxy to
      changeOrigin: true,
      pathRewrite: {'^/api': '/app/data-mdead/endpoint/data/v1/action/find'}, // Rewriting the path to match your MongoDB endpoint
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers':'*',
        'api-key': process.env.MONGODB_API_KEY // Using the environment variable here
      }
    })
  );
};

