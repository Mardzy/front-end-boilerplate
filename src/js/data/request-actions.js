const { GetRequest } = require('./requests');

const BASE_URL = 'https://swapi.dev/api';

const SPECIFIC_URL = (attribute) => BASE_URL + '/' + attribute;

const GetAttribute = (attribute) => GetRequest(SPECIFIC_URL(attribute));

const GetPerson = (attribute, name) => GetRequest(SPECIFIC_URL(attribute), { params: { search: name } });

const GetData = (attribute, name) => (attribute && name ? GetPerson(attribute, name) : GetAttribute(attribute));

module.exports = { GetData };
