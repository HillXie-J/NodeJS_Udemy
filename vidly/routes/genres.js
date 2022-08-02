<<<<<<< HEAD
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

=======
const express = require('express');
const router = express.Router();
const Joi = require('joi');

let genres = [
    {id: 1, name: 'genres1'},
    {id: 2, name: 'genres2'},
    {id: 3, name: 'genres3'}
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {

    res.send(findGenre(req, res));

});

router.post('/', (req, res) => {

    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);

    res.send(genre);

});


router.put('/:id', (req, res) => {
    const genre = findGenre(req, res);

    const { error } = validateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;

    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = findGenre(req, res);

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);

});


function validateGenre(genre){
    const schema = Joi.object(
        {name: Joi.string().min(3).required()}
    );

    return schema.validate(genre);
}

function findGenre(req, res){
    const genre = genres.find( g => g.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send('can not find.');

    return genre;
}

>>>>>>> dca433e6fc7900b62290b18e83a6c39bff6887db
module.exports = router;