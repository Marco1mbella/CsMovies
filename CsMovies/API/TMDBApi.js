
const API_TOKEN='63210c7fa2c8e6b685cddeecca9449ee';

export function getFilmsFromApiWithSearchedText (text,page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text +'&page=' +page
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }
// Récupération de l'image d'un film
  export function getImageFromApi(name){
  const url='https://image.tmdb.org/t/p/w500' + name;
  return url
 }

 // Récupération du détail d'un film
 export function getFilmDetailFromApi(id){  
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr'
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
 }

 // API/TMDBApi.js
/*

export function getFilmDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/11?api_key=63210c7fa2c8e6b685cddeecca9449ee&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}*/
