 const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/api/socket', { target: 'ws://' + process.env.REACT_APP_URL_NAME, ws: true }));
    app.use(proxy('/api', { target: 'http://' + process.env.REACT_APP_URL_NAME }));
    
};

 
/* module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://' + process.env.REACT_APP_URL_NAME,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/socket',
    createProxyMiddleware({
      target: 'ws://' + process.env.REACT_APP_URL_NAME,
       ws: true, 
      changeOrigin: true,
    })
  );
}; */