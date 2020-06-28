const axios = require('axios');

const { handleError } = require('../error');

const GetRequest = (url, config) => (axios
  .get(url, config)
  .then((response) => {
    const { data } = response;
    // console.log('GET data response: ', config, response);
    return data;
  })
  .catch((err) => handleError(err, 'Get Request Error: '))
);

module.exports = { GetRequest };
