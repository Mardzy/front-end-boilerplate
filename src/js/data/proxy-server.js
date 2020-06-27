const express = require('express');

const { GetData } = require('./request-actions');

const app = express();
const port = 3007;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', async (req, res) => {
  const { attribute, name } = req.query;
  const data = await GetData(attribute, name)
    .then((response) => response)
    .catch((err) => {
      console.log('Proxy error: ', err);
      throw err;
    });
  res.send(data);
});

app.listen(port, () => console.log('Server running on port:', port));
