import getApi from "./get";

const movieList = async () => {
  const allMovies = await getApi();
  allMovies.forEach((movie =>  {
   const moviesContainer = document.querySelector('.movies-container');
    const movieUL = document.createElement('ul');
    const movieLI = document.createElement('li');
    movieLI.className = 'movie-cards';
    movieLI.innerHTML = `<div>
      <img src=${movie.image.original} alt=${movie.name}>
      </div>
      <a href="${movie.officialSite}" class="movie-title">${movie.name}</a>
      <div class="movie-info">
        <p>${movie.weight}mb</p>
        <p>${movie.language}</p>
        <i class="fa fa-heart" aria-hidden="true"></i>
        <p>20 likes</p>
      </div>
      <button>Comments</button>`;

    movieUL.appendChild(movieLI);
    moviesContainer.appendChild(movieUL);
   }),
)};

export { movieList };