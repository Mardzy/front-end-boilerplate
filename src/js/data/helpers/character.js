const { GetRequest } = require('../requests');
const { ATTRIBUTE_URL } = require('./constants');

/**
 * Fetch residents' names
 * @param residents
 * @returns {Promise<[]>}
 */
const GetResidentsNames = async (residents) => {
  const PROXY_SERVER_ADDRESS = new URL('http://localhost:3007');
  PROXY_SERVER_ADDRESS.searchParams.delete('url');

  const promiseAll = await Promise.all(residents
    .map(async (resident) => {
      PROXY_SERVER_ADDRESS.searchParams.append('url', resident);
      const charName = await GetRequest(PROXY_SERVER_ADDRESS.href)
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
  const PROXY_SERVER_ADDRESS = new URL('http://localhost:3007');
  PROXY_SERVER_ADDRESS.searchParams.append('url', url);

  const planet = await GetRequest(PROXY_SERVER_ADDRESS.href);
  const residents = await GetResidentsNames(planet.residents);
  console.log('res: ', residents);
  return { planetName: planet.name, residents };
};
