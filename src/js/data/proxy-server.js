const express = require('express');

const { GetData } = require('./request-actions');

const app = express();
const port = 3007;

const { handleError } = require('../error');

const allCharacters = GetData('people')
  .then((res) => {
    console.log('all characters: ', res);
  })
  .catch((err) => handleError(err, 'All Characters Error: '));

const getCharacterName = () => '';

const getCharactersFromSamePlanet = () => '';

const getCharacterImages = () => '';

const addImagesToExistingData = () => '';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', async (req, res) => {
  const { attribute, name } = req.query;
  let data = null;
  switch (attribute) {
    case 'people':
      data = allCharacters;
  }

  data = await GetData(attribute, name)
    .then((response) => response)
    .catch((err) => handleError(err, 'Proxy Error: '));

  res.send(data);
});

app.listen(port, () => console.log('Server running on port:', port));
