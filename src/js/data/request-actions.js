const { GetRequest } = require('./requests');

const BASE_URL = 'https://swapi.dev/api';

const ATTRIBUTE_URL = (attribute) => BASE_URL + '/' + attribute;

const GetAttribute = (attribute) => GetRequest(ATTRIBUTE_URL(attribute));

const GetAttrWParams = (attribute, params) => GetRequest(ATTRIBUTE_URL(attribute), { params });

  module.exports = { GetAttribute, GetAttrWParams };
