const express = require('express');
const postsRouter = express.Router();


postsRouter.get('/:year/:month', (req, res) => {
    res.send(req.query);
});


module.exports = postsRouter;