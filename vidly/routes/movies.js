const express = require('express');
const { number } = require('joi');
const router = express.Router();
const Joi = require('joi');

const {Movie, listMovies, findMovieById, 
    validateMovie, findGenreById, createMovie, deleteMovie } =
    require('../models/movie');

const {Genre} = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin')

router.get('/', (req, res) => {
    listMovies()
        .then((movies) => res.send(movies));
});

router.get('/:id', (req, res) => {

    findMovieById(req.params.id)
        .then((movie) => {
            if (!movie) res.status(404).send('can not find');

            res.send(movie);
        })

});

router.post('/', auth, (req, res) => {



    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    findGenreById(req.body.genreId)
        .then((genre) => {
            if (!genre) return res.status(400).send('Invalid genre.')

            createMovie(
                req.body.title,
                genre,
                req.body.numberInStock,
                req.body.dailyRentalRate
            ).then(
                (result) => res.send(result)
            );



        });



});


router.put('/:id', auth, async (req, res) => {

    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await findGenreById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');


    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate

        }, { new: true }

        

    );

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    return res.send(movie);

});

router.delete('/:id', [auth, admin], (req, res) => {
    deleteMovie(req.params.id)
        .then(
            (movie) => res.send(movie)
        );

});






module.exports = router;