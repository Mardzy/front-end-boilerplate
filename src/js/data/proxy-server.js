const express = require('express');

const {
  AddImagesToExistingData,
  GetAllCharacters,
  GetCharacterImages
} = require('./helpers');

const app = express();
const port = 3007;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', async (req, res) => {
  const data = GetAllCharacters(req.query.attribute);
  console.log('here');
  const dataWithImages = GetCharacterImages();
  const newPromise = await Promise.all([data, dataWithImages]);
  const dataTransformed = AddImagesToExistingData(newPromise);

  res.send(dataTransformed);
});

app.listen(port, () => console.log('Server running on port:', port));
