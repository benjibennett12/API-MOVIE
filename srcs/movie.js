const request = require("postman-request");

const apiKey = 'aafdb177e07191f426cf18fde214076';

const movieID = (searchedMovie, callback) => {
    request(`https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&api_key=${apiKey}`, (error, response, body) => {
        if (error) {
            return callback(error, null);
        }

        const data = JSON.parse(body);
        if (data.results.length === 0) {
            return callback("Movie not found", null);
        }

        const movieIDD = data.results[0].id;
        const movieTitle = data.results[0].original_title;
        callback(null, movieIDD);
    });
};

module.exports = movieID;

