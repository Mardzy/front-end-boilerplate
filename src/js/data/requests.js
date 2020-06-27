const axios = require('axios');

function GetRequest (url, config) {
  return axios
    .get(url, config)
    .then((response) => {
      console.log('GET data response: ', config, response);
      const { data } = response;
      return data;
    })
    .catch((error) => {
      console.log('GET data error response: ', config, error.message);
      throw error;
    });
}

module.exports = { GetRequest };
