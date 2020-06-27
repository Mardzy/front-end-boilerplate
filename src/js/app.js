import 'regenerator-runtime/runtime';

import '../scss/app.scss';

const { GetRequest } = require('./data/requests');

const proxyServerAddress = 'http://localhost:3007';

const attribute = 'people';

const name = 'Luke';

const config = { params: { attribute, name } };

/**
 * @param url
 * @param cfg
 * @returns {Promise<void>}
 */
const init = async (url, cfg) => {
  const response = await GetRequest(url, cfg);
  return response;
};

init(proxyServerAddress, config);
