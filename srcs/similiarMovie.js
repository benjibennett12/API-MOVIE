const request = require("postman-request");
const apiKey = 'aafdb177e07191f426cf18fde214076';

const similarMovies = (movieId, callback) => {
    request(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`, (error, response, body) => {
        if (error) {
            callback(error, null);
        } else {
            const data = JSON.parse(body);
            callback(null, data.results);
        }
    });
};

module.exports = similarMovies;
