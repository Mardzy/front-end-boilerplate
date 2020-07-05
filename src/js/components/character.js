import 'regenerator-runtime/runtime';

import { backupImage, getElementByClass } from './helpers';
import { GetRequest } from '../data/requests';

const { localStorage } = window;

const character = [];

export const LoadCharacter = () => {
  const message = console.log(character && character[0].name, 'loaded.');
  return message;
};

const getCharacterFromLocalStorage = JSON.parse(localStorage.getItem('character'));

if (getCharacterFromLocalStorage) {
  character.push(getCharacterFromLocalStorage);
}

/**
 * Fetch residents' names
 * @param residents
 * @returns {Promise<[]>}
 */
const getResidentsNames = async (residents) => {
  const promiseAll = await Promise.all(residents
    .map(async (resident) => {
      const charName = await GetRequest(resident, {})
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
const getPlanetInfo = async (url) => {
  const planet = await GetRequest(url, {});
  const residents = await getResidentsNames(planet.residents);

  return { planetName: planet.name, residents };
};

/**
 * Create dynamic Card for a character
 * @type {boolean|[]}
 */
const characterContainer = getElementByClass('.character');
const characterCard = !!character.length && character.map(({
  birth_year,
  gender,
  height,
  homeworld,
  id,
  image,
  mass,
  name
}) => id && `<div class="card col character__col" >
  <img id=${id} src=${image || backupImage} class="card-img" alt=${name}>      
  <div class="card-body">
    <h2 class="card-title">${name}</h2>
    <p class="card-text">Born: ${birth_year}</p>
    <p class="card-text">Gender: ${gender}</p>
    <p class="card-text">Height: ${height}cm</p>
    <p class="card-text">Weight: ${mass}kg</p>         
    <button  
      class="btn btn-info character__button" 
      data-toggle="modal" 
      data-placement="right" 
      data-url=${homeworld}
      data-target="#staticBackdrop"
      title="Click to see characters from my homeworld" 
      >Homeworld</button>           
  </div>
  <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>  
</div>`);

if (characterContainer) {
  characterContainer.innerHTML = characterCard !== null
    ? characterCard && characterCard.join('') : [];
}

const residentListItems = (residents) => residents.map(({ name }) => `<li class="list-group-item">${name}</li>`);

const residentList = ({ residents }) => `<ul class="list-group modal-content">${residentListItems(residents)}</ul>`;

const addListToModal = (planet) => {
  const modal = getElementByClass('.modal-body');
  const modalTitle = getElementByClass('.modal-title');
  if (modal) {
    modal.innerHTML = residentList(planet);
    modalTitle.innerHTML = `Residents of Planet ${planet.planetName}`;
  }
};

/**
 * Handle "Homeworld" button click
 * gets planet info and populates list of residents from
 * the characters' home world
 * @return {modal}
 */
const characterButton = getElementByClass('.character__button');
if (characterButton) {
  document.addEventListener('click', async (event) => {
    if (event.target === characterButton) {
      const planet = await getPlanetInfo(event.target.getAttribute('data-url'));
      addListToModal(planet);
    }
  });
}
