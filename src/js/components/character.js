import { backupImage } from './helpers';

const { localStorage } = window;

const character = [];

export const LoadCharacter = () => {
  const message = console.log(character && character[0].name, 'loaded.');
  return message;
};

const getCharacterFromLocalStorage = JSON.parse(localStorage.getItem('character'));

character.push(getCharacterFromLocalStorage);

const characterContainer = document.querySelector('.character');

/**
 *
 * @type {boolean|unknown[]}
 */
const characterCard = !!character && character.map(({
  birth_year,
  gender,
  height,
  homeworld,
  id,
  image,
  mass,
  name,
  wiki,
}) => id && `<div class="card col character__col" >
        <img id=${id} src=${image || backupImage} class="card-img-top" alt=${name}>      
        <div class="card-body">
          <h2 class="card-title">${name}</h2>
          <p class="card-text">Born: ${birth_year}</p>
          <p class="card-text">Gender: ${gender}</p>
          <p class="card-text">Height: ${height}cm</p>
          <p class="card-text">Weight: ${mass}kg</p>         
          <a href=${homeworld} class="btn btn-info" data-toggle="tooltip" data-placement="right" title="Click to see characters from my homeworld">Homeworld</a>
        </div>
      </div>`);

if (characterContainer) {
  characterContainer.innerHTML = characterCard !== null
    ? characterCard && characterCard.join('') : [];
}
