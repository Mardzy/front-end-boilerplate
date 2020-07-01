const { GetRequest } = require('./requests');

const BASE_URL = 'https://swapi.dev/api';

const STAR_WARS_API_W_IMG = 'https://akabab.github.io/starwars-api/api/all.json';

const ATTRIBUTE_URL = (attribute) => BASE_URL + '/' + attribute;

const GetAttribute = (attribute) => GetRequest(ATTRIBUTE_URL(attribute));

const GetAttrWParams = (attribute, params) => GetRequest(ATTRIBUTE_URL(attribute), { params });

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
  GetPlanetResidents,
  GetPersonsName,
  STAR_WARS_API_W_IMG
};
