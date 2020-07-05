const _ = require('lodash');

const { GetRequest } = require('../requests');
const { ATTRIBUTE_URL, PROXY_SERVER_ADDRESS, STAR_WARS_API_W_IMG } = require('./constants');

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

const getCharacterFromPage = (characters) => new Promise(async (resolve, reject) =>
{
  try {
    resolve(await characters);
  } catch (e) {
    console.log('Err: ', e);
    reject(e);
  }
});

const GetCharactersFromNextPages = async (characters, url) => {
  const allCharacters = characters.results;
  const totalPages = Math.ceil(characters.count / 10);

  const promises = [];
  for (let i = 2; i <= totalPages; i++) {
    const newUrl = url + '/?page=' + i;
    promises.push(GetRequest(newUrl));
  }
  const promise = await Promise.all(promises.map((i) => getCharacterFromPage(i)));

  const promiseResult = promise.map((item) => item.results);
  const flattenPromise = _.flatten(promiseResult).concat(allCharacters);

  return flattenPromise;
};

const GetAllCharacters = async (attribute) => {
  const url = PROXY_SERVER_ADDRESS + ATTRIBUTE_URL(attribute);
  const allCharacters = await GetRequest(url);
  const getAllCharacters = await GetCharactersFromNextPages(allCharacters, url);
  return getAllCharacters;
};

const GetCharacterImages = async () => {
  const url = PROXY_SERVER_ADDRESS + STAR_WARS_API_W_IMG;
  const res = await GetRequest(url);
  return res.map((item) => ({
    id: item.id, name: item.name, image: item.image, wiki: item.wiki,
  }));
};

const GetPlanetResidents = async (url) => {
  const URL = PROXY_SERVER_ADDRESS + url;
  const res = await GetRequest(URL);
  return res.residents;
};

const GetPersonsName = async (url) => {
  const URL = PROXY_SERVER_ADDRESS + url;
  const res = await GetRequest(URL);
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
