import { backupImage, getElementByClass } from './helpers';

const { localStorage } = window;

let characters = [];

export const LoadGallery = (data) => {
  characters = data;
  return characters;
};

const getCharacters = () => JSON.parse(localStorage.getItem('star-wars-characters'));

const sendCharacterToLocalStorage = (name) => characters.filter((char) => {
  const startCaseName = name.includes('_') ? name.replace('_', ' ') : name;
  if (char.name === startCaseName) {
    return localStorage.setItem('character', JSON.stringify(char));
  }
});

const characterGallery = getElementByClass('.gallery__row');

characters = getCharacters();

const normalizeName = (name) => (name.includes(' ') ? name.replace(/ /g, '_') : name);

/**
 *
 * @type {boolean|string[]}
 */
const characterGalleryItems = !!characters && characters.map(({
  image,
  name,
  wiki,
}) => `<div class="card col-md-12 col-lg-4 gallery__col" style="width: 18rem;">
        <a href="../../character.html" class="gallery__link" id=${normalizeName(name)}>
            <img src=${image || backupImage} class="card-img-top" alt=${normalizeName(name)}>      
        </a>
        <div class="card-body">
          <h2 class="card-title">${name}</h2>
          <a href=${wiki} class="btn btn-secondary" target="_blank">Wiki</a>         
        </div>
      </div>`);

if (characterGallery !== null) {
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
