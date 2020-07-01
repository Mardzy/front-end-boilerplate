import 'regenerator-runtime/runtime';

import '../scss/app.scss';

const { GetRequest } = require('./data/requests');
const { handleError } = require('./error');
const { LoadGallery } = require('./components/gallery');

const { DATA } = require('./data/mock/');


const proxyServerAddress = 'http://localhost:3007';

const { localStorage } = window;

const attribute = 'people';

const name = '';

const config = { params: { attribute, name } };

const localStorageName = 'star-wars-characters';

/**
 * Sends data to local storage
 * @param data
 */
const populateStorage = (data) => localStorage
  .setItem(localStorageName, JSON.stringify(data));

/**
 * @param url
 * @param cfg
 * @returns {Promise<void>}
 */
const init = async (url, cfg) => {
  const response = await GetRequest(url, cfg);
  populateStorage(response || DATA);
  LoadGallery(response || DATA);
  return response || DATA;
};

init(proxyServerAddress, config)
  .then((r) => r)
  .catch((err) => handleError(err, 'Init Error: '));
