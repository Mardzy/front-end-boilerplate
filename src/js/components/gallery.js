const { localStorage } = window;

let characters = [];

export const LoadGallery = (data) => {
  characters = data;
  return characters;
};

const getElementByClass = (className) => document.querySelector(className);

const getCharacters = () => JSON.parse(localStorage.getItem('star-wars-characters'));

const sendCharacterToLocalStorage = (name) => characters.filter((char) => {
  const startCaseName = name.includes('_') ? name.replace('_', ' ') : name;
  if (char.name === startCaseName) {
    return localStorage.setItem('character', JSON.stringify(char));
  }
});

const characterGallery = getElementByClass('.gallery__row');

characters = getCharacters();

const backupImage = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.pngkit.com%2Fpng%2Ffull%2F49-498166_yoda-silhouette-png-star-wars-topps-funny.png&imgrefurl=https%3A%2F%2Fwww.pngkit.com%2Fbigpic%2Fu2q8e6a9u2t4w7u2%2F&tbnid=VSO2dLaOowj30M&vet=10CBUQxiAoAmoXChMI-NLj7oKp6gIVAAAAAB0AAAAAEAg..i&docid=fNk0lz70kC3nlM&w=692&h=1052&itg=1&q=default%20star%20wars%20image&ved=0CBUQxiAoAmoXChMI-NLj7oKp6gIVAAAAAB0AAAAAEAg'

const normalizeName = (name) => name.includes(' ')? name.replace(/ /g,"_") : name;

/**
 *
 * @type {boolean|string[]}
 */
const characterGalleryItems = !!characters && characters.map(({
  birth_year,
  gender,
  height,
  homeworld,
  id,
  image,
  mass,
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

const galleryLink = document.querySelector('.gallery__link');

if (galleryLink) {
  document.addEventListener('click', (event) => {
    localStorage.removeItem('character');

    sendCharacterToLocalStorage(event.target.alt || event.target.id);
  });
}
