const { localStorage } = window;

let characters = null;

export const LoadGallery = (data) => {
  characters = data;
  return characters;
};

const getCharacters = () => JSON.parse(localStorage.getItem('star-wars-characters'));

characters = getCharacters();
