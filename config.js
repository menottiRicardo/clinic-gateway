require('dotenv').config();

exports.port = process.env.PORT;
exports.rate = {
  windowMs: 5 * 60 * 1000,
  max: 100,
};
exports.proxies = {
  '/auth': {
    protected: false,
    target: 'http://localhost:9000',
    changeOrigin: true,
    pathRewrite: {
      [`^/auth`]: '',
    },
  },
  '/appointment': {
    protected: false,
    target: 'http://localhost:9001',
    changeOrigin: true,
    pathRewrite: {
      [`^/appointment`]: '',
    },
  },
};
