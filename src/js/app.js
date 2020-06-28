import 'regenerator-runtime/runtime';

import '../scss/app.scss';

const { GetRequest } = require('./data/requests');

const proxyServerAddress = 'http://localhost:3007';

const localStorage = window.localStorage;
/*
Attributes:
films string -- The URL root for Film resources
people string -- The URL root for People resources
planets string -- The URL root for Planet resources - 60
  residents: Array(3)
  0: "http://swapi.dev/api/people/22/"
  1: "http://swapi.dev/api/people/72/"
  2: "http://swapi.dev/api/people/73/"
species string -- The URL root for Species resources
starships string -- The URL root for Starships resources
vehicles string -- The URL root for Vehicles resources
*/
const attribute = 'people';

const name = '';

const config = { params: { attribute, name } };
/**
 * Sends data to local storage
 * @param data
 */
const populateStorage = (data) => {
  localStorage.setItem('data', JSON.stringify(data));
};

const fetchLocalStorage = (key) => {
  localStorage.getItem(key);
};

/**
 * @param url
 * @param cfg
 * @returns {Promise<void>}
 */
const init = async (url, cfg) => {
  const response = await GetRequest(url, cfg);
  console.log('init response: ', response);
  populateStorage(response);
};

init(proxyServerAddress, config);
const LocalStorage = fetchLocalStorage('data');
console.log('local storage: ', LocalStorage);
