const request = require("postman-request");
const apiKey = 'aafdb177e07191f426cf18fde214076';

const similarMovies = (movieId, callback) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`;
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Movie service!', undefined);
        } else if (body.success) {
            callback('Unable to Similiar Movie', undefined);
        } else {
            callback(undefined, body.results[0].original_title);
        }
    });
};

module.exports = similarMovies;

