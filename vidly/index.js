const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);


const port = process.env.PORT;

/* throw new Error('Something failed during startup.'); */

/* const p = Promise.reject(new Error('Something failed miserably!'));
p.then(() => console.log('Done')); */

const server = app.listen(port, () => {
    winston.info(`Listening on ${port}`);
});

module.exports = server;
