const { handleError } = require('../../error');
const { GetRequest } = require('../requests');
const { GetAttribute, GetAttrWParams, STAR_WARS_API_W_IMG } = require('../request-actions');

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

  return allCharacters;
};

const GetCharacterImages = async () => {
  const res = await GetRequest(STAR_WARS_API_W_IMG);
  return res.map((item) => ({
    id: item.id, name: item.name, image: item.image, wiki: item.wiki,
  }));
};

const GetPlanetResidents = async (url) => {
  const res = await GetRequest(url);
  return res.residents;
};

const GetPersonsName = async (url) => {
  const res = await GetRequest(url);
  return res.name;
};

module.exports = {
  AddImagesToExistingData,
  GetAllCharacters,
  GetCharactersFromNextPages,
  GetCharacterImages,
  GetPlanetResidents,
  GetPersonsName
};
