const express = require('express');
const coursesRouter = express.Router();

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];


coursesRouter.get('/', (req, res) => {
    res.send(courses);

});



coursesRouter.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');
  res.send(course);
});

coursesRouter.post('/', (req, res) => {

    const {error} = validateCourse(req.body);


    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);

    res.send(course);

});

coursesRouter.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const {error} = validateCourse(req.body);


    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);

});


coursesRouter.delete('/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const course = courses.find(c => c.id === id);
    if (!course) return res.status(404).send('The course with the given ID was not found.');

    const index = courses.indexOf(course);

    courses.splice(index, 1);
    
    res.send(course);

});


function validateCourse(course) {
    const schema = Joi.object( {
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);


}

module.exports = coursesRouter;