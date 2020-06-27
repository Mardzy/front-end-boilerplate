const { GetRequest } = require('./requests');

const BASE_URL = 'https://swapi.dev/api';

const PEOPLE_URL = (attribute) => BASE_URL + '/' + attribute;

const GetPeople = (attribute) => GetRequest(PEOPLE_URL(attribute));

const GetAttribute = (attribute, name) => GetRequest(PEOPLE_URL(attribute), { params: { search: name } });

const GetData = (attribute, name) => (attribute && name ? GetAttribute(attribute, name) : GetPeople(attribute));

module.exports = { GetData };
