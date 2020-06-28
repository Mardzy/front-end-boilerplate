
const express = require('express');

const { GetAttribute, GetAttrWParams } = require('./request-actions');
const { GetRequest } = require('./requests');
const { handleError } = require('../error');

const app = express();
const port = 3007;

const getCharactersFromNextPages = async ({ count, results }) => {
  const allCharacters = results.map((i) => i);
  const totalPages = Math.ceil(count / 10);
  console.log('total pages', totalPages);
  for (let i = 2; i <= totalPages; i++) {
    // eslint-disable-next-line no-await-in-loop
    const nextCharacters = await GetAttrWParams('people', { page: i })
      .then((res) => res.results)
      .catch((err) => handleError(err, 'Get Next Characters Error:'));
    nextCharacters.forEach((character) => allCharacters.push(character));
  }
  return allCharacters;
};

const getAllCharacters = async (attribute) => GetAttribute(attribute)
  .then(getCharactersFromNextPages)
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
  const { attribute, params } = req.query;

  const data = await getAllCharacters(attribute);
  /*
  const data = await GetAttribute(attribute, name)
    .then((response) => response)
    .catch((err) => handleError(err, 'Proxy Error: '));
    */

  res.send(data);
});

app.listen(port, () => console.log('Server running on port:', port));
