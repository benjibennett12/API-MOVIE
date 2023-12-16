const express = require('express');
const path = require('path');
const hbs = require('hbs');
const movieID = require('./srcs/movie');

const app = express();
const port = 8040;

app.use(express.static(path.join(__dirname, '../public')));

app.set("view engine", "hbs");

app.get('/', (req, res) => {
    res.render("index", {
        title: "Search Movie",
        footer: "BY BENJI BENNETT"
    });
});

app.get('/movie', (req, res) => {
    const movieId = req.query.id;

    if (!movieId || isNaN(movieId)) {
        return res.status(400).send({
            error: 'Invalid or missing movie ID'
        });
    }

    movieID(req.query.id, (err, id) => {
        if (err) {
            return res.send({
                error: 'Error fetching movie ID'
            });
        }

        res.send({
            id: id
        });
    });
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log('Server is working');
});