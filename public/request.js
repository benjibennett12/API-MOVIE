console.log('Starting the script');

const search = document.querySelector('#user-input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const movieList = document.querySelector('#movie-list');
const similarMovies = require('./srcs/similarMovies');

document.getElementById('movieForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const searchedMovie = search.value;
    console.log('Searched movie:', searchedMovie);

    const apiKey = 'aafdb177e07191f426cf18fde214076';

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    movieList.textContent = '';

    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&api_key=${apiKey}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            console.log('API Response:', data);

            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                const movieId = data.results.length > 0 ? data.results[0].id : null;
                console.log('Movie ID:', movieId);

                messageOne.textContent = `Movie ID: ${movieId}`;

                if (movieId) {
                    similarMovies(movieId, (err, similarMoviesData) => {
                        console.log('Similar Movies Data:', similarMoviesData);

                        if (err) {
                            messageTwo.textContent = err;
                        } else {
                            messageTwo.textContent = `Similar Movies: ${JSON.stringify(similarMoviesData)}`;
                        }
                    });
                } else {
                    messageTwo.textContent = 'No movie found';
                }
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            messageOne.textContent = 'An error occurred while fetching data.';
        });
});
