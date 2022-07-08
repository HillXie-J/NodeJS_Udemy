const express = require('express');

const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
    res.render('index', {title: 'My Express App', message: 'Hello'});
});

module.exports = rootRouter;