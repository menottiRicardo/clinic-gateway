// import all the required packages
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./config');

// configure the application
const app = express();
const port = config.port;

const alwaysAllow = (_1, _2, next) => {
  next();
};

const protect = (req, res, next) => {
  const { authenticated } = req.session;

  if (!authenticated) {
    res.sendStatus(401);
  } else {
    next();
  }
};

Object.keys(config.proxies).forEach((path) => {
  const { protected, ...options } = config.proxies[path];
  const check = protected ? protect : alwaysAllow;
  app.use(path, check, createProxyMiddleware(options));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
