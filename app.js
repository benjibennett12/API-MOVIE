const express = require('express');
const app = express();
const port = 8040;
const path = require('path');
const movieID = require('./srcs/movie');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html' ));
});


app.get('/movie', async (req, res) => {
    const movieTitle = req.query.title;

    if (!movieTitle) {
        return res.status(400).send({
            error: 'Invalid movie Title'
        });
    }

    try {
        const movieId = await movieID(movieTitle);
        if (!movieId) {
            return res.status(404).send({
                error: 'Movie not found'
            });
        }

        const similarMoviesData = await similarMovies(movieId);

        res.send({
            movieId: movieId,
            similarMovies: similarMoviesData
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({
            error: 'Internal Server Error'
        });
    }
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log('Server is working');
});
