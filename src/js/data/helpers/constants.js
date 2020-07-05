const { GetRequest } = require('../requests');

const GetAttribute = (attribute) => GetRequest(ATTRIBUTE_URL(attribute));

const GetAttrWParams = (attribute, params) => GetRequest(ATTRIBUTE_URL(attribute), { params });

const BASE_URL = 'https://swapi.dev/api';

const ATTRIBUTE_URL = (attribute) => BASE_URL + '/' + attribute;

const PROXY_SERVER_ADDRESS = 'http://localhost:3007/?url=';

const STAR_WARS_API_W_IMG = 'https://akabab.github.io/starwars-api/api/all.json';

module.exports = {
  ATTRIBUTE_URL,
  GetAttribute,
  GetAttrWParams,
  PROXY_SERVER_ADDRESS,
  STAR_WARS_API_W_IMG
};
