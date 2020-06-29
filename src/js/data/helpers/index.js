const { handleError } = require('../../error');
const { GetAttribute, GetAttrWParams, GetPlanetResidents } = require('../request-actions');

const AddImagesToExistingData = (promise) => {
  const primaryData = promise[0];
  const secondaryData = promise[1];
  return primaryData
    .filter((pri) => secondaryData.map((sec) => {
      if (pri.name === sec.name) {
        pri.id = sec.id;
        pri.image = sec.image;
        pri.wiki = sec.wiki;
      }

      return pri;
    }));
};

const GetAllCharacters = async (attribute) => GetAttribute(attribute)
  .then(GetCharactersFromNextPages)
  .catch((err) => handleError(err, 'All Characters Error: '));

const AddResidentsFromHomeplanet = async (characters) => {
  const newCharacters = characters;

  for (let i = 0; i < characters.length; i++) {
    const url = await GetPlanetResidents(characters[i].homeworld);
    for (let j = 0; j < url.length; j++) {
      newCharacters[j].homeplanetResidents = {};
      newCharacters[j].homeplanetResidents.url = url;
    }
  }

  return newCharacters;
};

const GetCharactersFromNextPages = async ({ count, results }) => {
  const allCharacters = results.map((i) => i);
  const totalPages = Math.ceil(count / 10);

  for (let i = 2; i <= totalPages; i++) {
    // eslint-disable-next-line no-await-in-loop
    const nextCharacters = await GetAttrWParams('people', { page: i })
      .then((res) => res.results)
      .catch((err) => handleError(err, 'Get Next Characters Error:'));
    nextCharacters.forEach((character) => allCharacters.push(character));
  }
  // const charactersWithHomeplanetData = await AddResidentsFromHomeplanet(allCharacters);

  return allCharacters;
};

module.exports = { AddImagesToExistingData, GetAllCharacters, GetCharactersFromNextPages };
