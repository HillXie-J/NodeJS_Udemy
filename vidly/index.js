<<<<<<< HEAD
const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);
=======


const express = require('express');
const app = express();
const genres = require('./routes/genres');

app.use(express.json());
app.use('/api/genres', genres);

>>>>>>> dca433e6fc7900b62290b18e83a6c39bff6887db


const port = process.env.PORT;

<<<<<<< HEAD
/* throw new Error('Something failed during startup.'); */

/* const p = Promise.reject(new Error('Something failed miserably!'));
p.then(() => console.log('Done')); */

const server = app.listen(port, () => {
    winston.info(`Listening on ${port}`);
});

module.exports = server;
=======
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});




>>>>>>> dca433e6fc7900b62290b18e83a6c39bff6887db
