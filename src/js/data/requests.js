const axios = require('axios');

const { handleError } = require('../error');
/**
 * Axios get request
 * @param url
 * @param config
 * @return {Promise<T | void>}
 * @constructor
 */
const GetRequest = (url, config) => (axios
  .get(url, config)
  .then((response) => response.data)
  .catch((err) => handleError(err, 'Axios GET Request Error: '))
);

/**
 * space for future requests
 */

module.exports = { GetRequest };
