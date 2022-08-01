
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');
const logger = require('./middleware/logger');
const authenticator = require('./authenticator');

const coursesRouter = require('./routes/courses');
const postsRouter = require('./routes/posts');
const rootRouter = require('./routes/root');

const Joi = require('joi');

const express = require('express');

const app = express();

const helmet = require('helmet');

const morgan = require('morgan');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());

app.use(express.urlencoded( {extended: true} ));

app.use(express.static('public'));

app.use(helmet());

app.use('/', rootRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/posts', postsRouter);

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

dbDebugger('Connected to the database');

app.use(logger);

app.use(authenticator);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


