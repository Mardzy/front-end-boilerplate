const express = require('express');

const { GetRequest } = require('./requests');

const app = express();
const port = 3007;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', async (req, res) => {
  const { config, url } = req.query;
  const response = await GetRequest(url, config);

  res.send(response);
});

app.listen(port, () => console.log('Server running on port:', port));
