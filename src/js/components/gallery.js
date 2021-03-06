import { backupImage, getElementByClass } from './helpers';
import { GetAllCharacters, GetCharacterImages, AddImagesToExistingData } from '../data/helpers/gallery';

const { localStorage, location } = window;
const { addEventListener } = document;

const LOCAL_STORAGE_CHARACTERS = 'characters';
let characters = [];

/**
 * Sends data to local storage
 * @param data
 */
const addCharactersToLocalStorage = (data) => localStorage.setItem(LOCAL_STORAGE_CHARACTERS, JSON.stringify(data));

/**
 * Fetch characters && set characters in local storage
 */
if (characters.length !== 82) {
  (async () => {
    if (LOCAL_STORAGE_CHARACTERS in localStorage) {
      characters = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CHARACTERS));
    } else {
      const attribute = 'people';
      const chars = GetAllCharacters(attribute);
      const charsWithImages = GetCharacterImages();
      const allChars = await Promise.all([chars, charsWithImages]);
      const response = AddImagesToExistingData(allChars);

      addCharactersToLocalStorage(response);
      characters = response;
    }
    return characters;
  })();
}

/**
 * Handle search bar submit
 * @ todo error handling on search Bar
 * @param event
 */
const searchBar = getElementByClass('.search-bar');
const handleSubmit = (event) => {
  event.preventDefault();
  const { value } = searchBar.elements.search;
  const searchResult = characters.filter((char) => char.name.includes(value));
  addCharactersToLocalStorage(searchResult);
  characters = searchResult;
  if (characters.length !== 0) {
    location.reload();
  } else {
    localStorage.clear();
  }

  return characters;
};

/**
 * Remove 'characters' item from local storage
 * reload page
 * @param target
 */
const clearLocalStorageReload = ({ target }) => {
  if (target.className === 'btn-link all-chars-btn') {
    localStorage.removeItem(LOCAL_STORAGE_CHARACTERS);
    location.reload();
    return console.log('clicked');
  }
};

/**
 * Handle events in dropdown menu
 * @todo add more cases to handle other character properties
 * @param target
 */
const handleDropdown = ({ target }) => {
  if (target.className === 'dropdown-item') {
    let sortedCharacters;
    const charProp = target.innerHTML.toLowerCase().split(' ')[0];
    switch (charProp) {
      case 'name':
        sortedCharacters = characters.sort((a, b) => (a[charProp] > b[charProp] ? 1 : -1));
        break;
      case 'name-descending':
        sortedCharacters = characters.sort((a, b) => (a[charProp] < b[charProp] ? 1 : -1));
        break;
      default:
        console.log('default');
    }
    characters = sortedCharacters;
    localStorage.setItem(LOCAL_STORAGE_CHARACTERS, JSON.stringify(sortedCharacters));
    location.reload();
  }
};
const dropdownMenu = getElementByClass('.dropdown-menu');
const dropdown = getElementByClass('.dropdown');
dropdownMenu.addEventListener('click', handleDropdown);

/**
 * Remove search bar and dropdown
 * Clear local storage
 */
const header = getElementByClass('.header');
if (searchBar && dropdown) {
  addEventListener('submit', handleSubmit);
  if (characters.length === 1) {
    searchBar.style.display = 'none';
    dropdown.style.display = 'none';
    const allCharButton = document.createElement('button');
    allCharButton.className = 'btn-link all-chars-btn';
    allCharButton.innerHTML = 'Get All Characters';
    if (header.parentNode.childNodes[4].textContent !== 'Get All Characters') {
      header.parentNode.insertBefore(allCharButton, header.nextSibling);
    }
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
}) => `<div class="card col-md-12 col-lg-4 gallery__col">
        <a href="/front-end-boilerplate/dist/character.html" class="gallery__link" id=${normalizeName(name)}>
        <!-- prod char link <a href="/character.html" class="gallery__link" id=${normalizeName(name)}>-->
            <img  src=${image || backupImage} class="card-img" alt=${normalizeName(name)}>      
        </a>
        <div class="card-body">
          <h2 class="card-title">${name}</h2>
          <a href=${wiki} class="btn btn-secondary" target="_blank">Wiki</a>         
        </div>
      </div>`);

/**
 * Load characters into gallery
 */
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
 * Send clicked character to Local storage
 * @param target
 */
const refreshCharacterInLocalStorage = ({ target }) => {
  if (target.className === 'card-img') {
    localStorage.removeItem('character');

    sendCharacterToLocalStorage(target.alt);
  }
};

/**
 * Handles click event on gallery link
 * @param event
 */
const galleryLink = getElementByClass('.gallery__link');
if (galleryLink) {
  addEventListener('click', refreshCharacterInLocalStorage);
}
