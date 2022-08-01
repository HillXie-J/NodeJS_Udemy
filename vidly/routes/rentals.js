const mongoose = require('mongoose');
const express = require('express');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { validateRental, Rental } = require('../models/rental');
const router = express.Router();

const Transaction = require('mongoose-transactions');
const transaction= new Transaction();
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

router.post('/', auth, async (req, res) => {

    const {error} = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    const rental = new Rental(
        {
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        }
    );

    try{
        transaction.insert('Rental', rental);
        transaction.update('Movie', {_id: movie._id}, {
            $inc: {numberInStock: -1}
        });

        await transaction.run();
        res.send("OK");
    }
    catch(ex) {
        transaction.rollback();
        res.status(500).send(ex.error);
    }


});

router.get('/', async (req, res, next) => {
    // throw new Error('Could not get the rentals');
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);

});

router.get("/:id", validation, async (req, res) => {

    const rental = await Rental.findById(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given ID was not found.');

    res.send(rental);
});

module.exports = router;
