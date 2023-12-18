const movieForm = document.querySelector('#movieForm');
const search = document.querySelector('#user-input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const movieList = document.querySelector('#movie-list');
const apiKey = "aafdb177e07191f426cf18fde214076";
const halfPath = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/'

const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const addMovieClickListeners = () => {
  const movieElements = document.querySelectorAll('.movie');
  movieElements.forEach((movieElement) => {
    movieElement.addEventListener('click', () => {
      const movieId = movieElement.dataset.id;
      displaySimilarMovies(movieId);
    });
  });
};


document.getElementById('movieForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const searchedMovie = encodeURIComponent(search.value.trim());
    
    
    messageOne.textContent = '';
    movieList.textContent = '';
    
    try {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWZkYjE3NzFlMDcxOTFmNDI2Y2YxOGZkZTIxNDA3NiIsInN1YiI6IjY1NzhiNDk5ODlkOTdmMDExZGNkYjc1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e_bNqRRpvf-Bg3DvzT3D0irHs-j_PthxbbycMYi0SME'
            }
          
    };
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&include_adult=false&language=en-US&page=1`;
    console.log(url);
    const data = await fetchData(url, options);
    
    console.log('API Response:', data);
    
    movieList.innerHTML = data.results
    .map((movie) => {
        const fullPath = `${halfPath}${movie.poster_path}`;
        return `<div class="movie" data-id="${movie.id}">
        <img src="${fullPath}" alt="${movie.title}">
        <h1> ${movie.title}</h1>
        <h4> Click Image for Similiar Titles </h4>
        <p>${movie.overview}</p>
        </div>`;
    })
    .join('');
    addMovieClickListeners();
} catch (error) {
    console.error('Error fetching data:', error);
    messageOne.textContent = 'An error occurred while fetching data.';
}
});




const displaySimilarMovies = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key${apiKey}`;
 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWZkYjE3NzFlMDcxOTFmNDI2Y2YxOGZkZTIxNDA3NiIsInN1YiI6IjY1NzhiNDk5ODlkOTdmMDExZGNkYjc1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e_bNqRRpvf-Bg3DvzT3D0irHs-j_PthxbbycMYi0SME'
  }
};

  const data = await fetchData(url, options);
  console.log(data);


  movieList.innerHTML = data.results
    .map((similarMovie) => {;
      return `<div class="movie" data-id="${similarMovie.id}">
                <ul>
                    <li>${similarMovie.original_title}</li>
                </ul>
              </div>`;
    })
    .join('');

  addMovieClickListeners();
};