const Joi = require("joi");
const mongoose = require('mongoose');
const { genreSchema, Genre } = require('./genre');


const Movie = mongoose.model('Movie', new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 255
        },
        genre: {
            type: genreSchema,
            required: true
        },
        numberInStock: {
            type: Number,
            required: true,
            min: 0,
            max: 255
        },
        dailyRentalRate: {
            type: Number,
            required: true,
            min: 0,
            max: 255
        }
    }
));

async function createMovie(title, genre, numberInStock, dailyRentalRate) {

    const movie = new Movie(
        {
            title: title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: numberInStock,
            dailyRentalRate: dailyRentalRate
        }
    );

    const result = await movie.save();
    console.log(result);
    return result;
}

async function listMovies() {
    const movies = await Movie.find();
    console.log(movies);
    return movies;
}

async function findMovieById(movieId) {
    const movie = await Movie.findById(movieId);
    console.log(movie);
    return movie;
}

async function updateMovie(movieId, title) {
    const movie = await Movie.findById(movieId);
    movie.title = title;
    movie.save();
    return movie;
}

async function deleteMovie(movieId) {
    const movie = await Movie.findByIdAndDelete(movieId);
    //movie.save();
    return movie;
}

async function findGenreById(genreId) {
    return await Genre.findById(genreId);
}


function validateMovie(movie) {

    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });

    return schema.validate(movie);
}



exports.listMovies = listMovies;
exports.findMovieById = findMovieById;
exports.validateMovie = validateMovie;
exports.findGenreById = findGenreById;
exports.createMovie = createMovie;
exports.Movie = Movie;
exports.deleteMovie = deleteMovie;