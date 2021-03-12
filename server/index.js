const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const { startDev, logRequest } = require(`./utils.js`);

// middleware
app.use(express.json());
app.use((req, res, next) => {
  logRequest(req);
  next();
});
app.use('/api', require('./api'));

startDev(app, PORT);
