import { backupImage, getElementByClass } from './helpers';
import { GetRequest } from '../data/requests';
import { DATA } from '../data/mock';

const { localStorage, location } = window;
const { addEventListener, createElement } = document;

const proxyServerAddress = 'http://localhost:3007';
const starWarsCharacters = 'characters';
let characters = [];

/**
 * Sends data to local storage
 * @param data
 */
const addCharactersToLocalStorage = (data) => localStorage.setItem(starWarsCharacters, JSON.stringify(data));

/**
 * Fetch characters && set characters in local storage
 */
(async (url) => {
  if (starWarsCharacters in localStorage) {
    characters = JSON.parse(localStorage.getItem(starWarsCharacters));
  } else {
    const attribute = 'people';
    const config = { params: { attribute } };
    const response = await GetRequest(url, config);
    addCharactersToLocalStorage(response || DATA);
    characters = response;
    console.log('char2: ', characters);
  }
  return characters;
})(proxyServerAddress);

/**
 * Handle search bar submit
 * @param event
 */
const searchBar = getElementByClass('.search-bar');
const handleSubmit = (event) => {
  event.preventDefault();
  const { value } = searchBar.elements.search;
  const searchResult = characters.filter((char) => char.name.includes(value));
  characters = addCharactersToLocalStorage(searchResult);
  location.reload();
  return characters;
};

const clearLocalStorageReload = ({ target }) => {
  if (target.className === 'btn-link all-chars-btn') {
    console.log(target, 'clicked');
    localStorage.removeItem(starWarsCharacters);
    location.reload();
    return console.log('clicked');
  }
};

if (searchBar) {
  addEventListener('submit', handleSubmit);
  if (characters.length === 1) {
    searchBar.style.display = 'none';
    const header = getElementByClass('.header');
    const allCharButton = document.createElement('button');
    header.parentNode.insertBefore(allCharButton, header.nextSibling);
    allCharButton.className = 'btn-link all-chars-btn';
    allCharButton.innerHTML = 'Get All Characters';
    addEventListener('click', clearLocalStorageReload);
  }
}

/**
 * Send character to local storage
 * @param name
 * @returns {*[]}
 */
const sendCharacterToLocalStorage = (name) => characters.filter((char) => {
  const startCaseName = name.includes('_') ? name.replace('_', ' ') : name;
  if (char.name === startCaseName) {
    return localStorage.setItem('character', JSON.stringify(char));
  }
});

/**
 * Make certain names are all in original format
 * @param name
 * @returns {*}
 */
const normalizeName = (name) => (name.includes(' ') ? name.replace(' ', '_') : name);

/**
 * Create gallery items
 * @type {boolean|string[]}
 */
const characterGallery = getElementByClass('.gallery__row');

/**
 * Create gallery items
 * @type {boolean|string[]}
 */
const characterGalleryItems = characters && !!characters.length && characters.map(({
  image,
  name,
  wiki,
}) => `<div class="card col-md-12 col-lg-4 gallery__col" style="width: 18rem;">
<!-- prod char link <a href="/front-end-boilerplate/dist/character.html" class="gallery__link" id=${normalizeName(name)}>-->
        <a href="./character.html" class="gallery__link" id=${normalizeName(name)}>
            <img src=${image || backupImage} class="card-img-top" alt=${normalizeName(name)}>      
        </a>
        <div class="card-body">
          <h2 class="card-title">${name}</h2>
          <a href=${wiki} class="btn btn-secondary" target="_blank">Wiki</a>         
        </div>
      </div>`);

if (characterGallery && characterGalleryItems) {
  characterGallery.innerHTML = characterGalleryItems && characterGalleryItems.join('') ? characterGalleryItems.join('') : [];
} else {
  (() => {
    setTimeout(function() {
      location.reload();
    }, 2000);
  })();
}

/**
 * Handles click event on gallery link
 * @param event
 */
const galleryLink = getElementByClass('.gallery__link');
if (galleryLink) {
  addEventListener('click', (event) => {
    localStorage.removeItem('character');

    sendCharacterToLocalStorage(event.target.alt || event.target.id);
  });
}

function onCharacterUpdate (characterLength, gallerInnerHtml) {
  if(characters.length === 82 && characterGallery.innerHTML === null) {
    location.reload();
  }
}

onCharacterUpdate(characters.length)
