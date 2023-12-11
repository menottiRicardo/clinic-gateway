require('dotenv').config();

exports.port = process.env.PORT;
exports.rate = {
  windowMs: 5 * 60 * 1000,
  max: 100,
};
exports.proxies = {
  '/auth': {
    protected: false,
    target: 'auth',
    changeOrigin: true,
    pathRewrite: {
      [`^/auth`]: '',
    },
  },
  '/appointment': {
    protected: false,
    target: 'appointment',
    changeOrigin: true,
    pathRewrite: {
      [`^/appointment`]: '',
    },
  },
};
