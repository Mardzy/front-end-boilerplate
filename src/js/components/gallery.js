import { backupImage, getElementByClass } from './helpers';

const { localStorage } = window;

let characters = [];
let searchValue = '';

export const LoadGallery = (data) => {
  console.log(data.length, 'Characters found');
  return data;
};

/**
 * Handle search bar submit
 * @param event
 */
const searchBar = getElementByClass('.search-bar');
const handleSubmit = (event) => {
  event.preventDefault();
  searchValue = searchBar.elements.search.value;
};
if (searchBar) {
  searchBar.addEventListener('submit', handleSubmit);
}

/**
 * Fetch Characters from local storage
 * @returns {any}
 */
const getCharacters = JSON.parse(localStorage.getItem('star-wars-characters'));

const filterCharacters = (search) => getCharacters.filter((character) => (character.name === search));

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

const characterGallery = getElementByClass('.gallery__row');

characters = searchValue.length > 1 ? filterCharacters(searchValue) : getCharacters;

/**
 * Make certain names are all in original format
 * @param name
 * @returns {*}
 */
const normalizeName = (name) => (name.includes(' ') ? name.replace(/ /g, '_') : name);

/**
 * Create gallery items
 * @type {boolean|string[]}
 */
const characterGalleryItems = !!characters.length && characters.map(({
  image,
  name,
  wiki,
}) => `<div class="card col-md-12 col-lg-4 gallery__col" style="width: 18rem;">
        <a href="/dist/character.html" class="gallery__link" id=${normalizeName(name)}>
            <img src=${image || backupImage} class="card-img-top" alt=${normalizeName(name)}>      
        </a>
        <div class="card-body">
          <h2 class="card-title">${name}</h2>
          <a href=${wiki} class="btn btn-secondary" target="_blank">Wiki</a>         
        </div>
      </div>`);

if (characterGallery && characterGalleryItems) {
  characterGallery.innerHTML = characterGalleryItems !== null
    ? characterGalleryItems.join('') : [];
}

/**
 * Handles click event on gallery link
 * @param event
 */
const galleryLink = getElementByClass('.gallery__link');
if (galleryLink) {
  document.addEventListener('click', (event) => {
    localStorage.removeItem('character');

    sendCharacterToLocalStorage(event.target.alt || event.target.id);
  });
}
