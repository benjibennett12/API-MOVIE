const request = require("postman-request");
const apiKey = 'aafdb177e07191f426cf18fde214076';

const movieID = (searchedMovie, callback) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchedMovie}&api_key=${apiKey}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            return callback('Unable to connect to Movie service!', null, null);
        }

        if (body.results.length === 0) {
            return callback("Movie not found", null, null);
        }

        const movieIDD = body.results[0].id;
        const movieTitle = body.results[0].original_title;
        callback(null, movieIDD, movieTitle);
    });
};

module.exports = movieID;


