// import all the required packages
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
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

app.disable('x-powered-by');

app.use(helmet());

app.use(cors());

Object.keys(config.proxies).forEach((path) => {
  const { protected, ...options } = config.proxies[path];
  const check = protected ? protect : alwaysAllow;
  console.log(
    `Proxy ${path} -> ${options.target} = ${
      protected ? 'protected' : 'unprotected'
    }`
  );
  app.use(path, check, createProxyMiddleware(options));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
