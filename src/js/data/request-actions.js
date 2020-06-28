const { GetRequest } = require('./requests');

const BASE_URL = 'https://swapi.dev/api';

const STAR_WARS_API_W_IMG = 'https://akabab.github.io/starwars-api/api/all.json';

const ATTRIBUTE_URL = (attribute) => BASE_URL + '/' + attribute;

const GetAttribute = (attribute) => GetRequest(ATTRIBUTE_URL(attribute));

const GetAttrWParams = (attribute, params) => GetRequest(ATTRIBUTE_URL(attribute), { params });

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
  GetAttribute,
  GetAttrWParams,
  GetCharacterImages,
  GetPlanetResidents,
  GetPersonsName
};
