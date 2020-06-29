const { localStorage } = window;

let characters = null;

export default (data) => {
  characters = data;
  return characters;
};

const getCharacters = () => JSON.parse(localStorage.getItem('star-wars-characters'));

const getCharacter = (name) => characters.filter((char) => {
  if (char.name === name) {
    return localStorage.setItem('character', JSON.stringify(char));
  } });

const characterGallery = document.querySelector('.gallery__row');

characters = getCharacters();

const characterGalleryItems = characters.map(({
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
        <a href="../html/character.html" onclick=${getCharacter(name)}>
            <img id=${id} src=${image} class="card-img-top" alt=${name}>      
        </a>
        <div class="card-body">
          <h2 class="card-title">${name}</h2>
          <p class="card-text">Born: ${birth_year}</p>
          <p class="card-text">Gender: ${gender}</p>
          <p class="card-text">Height: ${height}cm</p>
          <p class="card-text">Weight: ${mass}kg</p>
          <a href=${wiki} class="btn btn-secondary" target="_blank">${name}'s wiki</a>         
          <a href=${homeworld} class="btn btn-info">Homeworld</a>
        </div>
      </div>`);

characterGallery.innerHTML = characterGalleryItems.join('');
