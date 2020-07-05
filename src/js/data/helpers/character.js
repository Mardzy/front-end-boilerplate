const { GetRequest } = require('../requests');
const { PROXY_SERVER_ADDRESS } = require('./constants');

/**
 * Fetch residents' names
 * @param residents
 * @returns {Promise<[]>}
 */
const GetResidentsNames = async (residents) => {
  const promiseAll = await Promise.all(residents
    .map(async (resident) => {
      const url = PROXY_SERVER_ADDRESS + resident;
      const charName = await GetRequest(url)
        .then((res) => res.name)
        .catch((err) => console.log('Err: ', err));

      return { url: resident, name: charName };
    }));

  return promiseAll;
};

/**
 * Fetch Planet Info
 * @param url
 * @returns {Promise<{planetName: *, residents: []}>}
 */
export const GetPlanetInfo = async (url) => {
  const URL = PROXY_SERVER_ADDRESS + url;
  const planet = await GetRequest(URL);
  const residents = await GetResidentsNames(planet.residents);

  return { planetName: planet.name, residents };
};
