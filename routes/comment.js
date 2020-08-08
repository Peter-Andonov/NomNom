const express = require('express');
const {
    commentRecipe,
    commentArticle,
} = require('../controllers/comment');
const {
    checkUserAuth
} = require('../controllers/user');
const commentRouter = express.Router();


commentRouter.post('/comment/recipe', checkUserAuth, async (req, res, next) => {
    try {
        const newComment = await commentRecipe(req, res);
        return res.status(201).json(newComment);
    } catch (err) {
        next(err);
    };
});

commentRouter.post('/comment/article', checkUserAuth, async (req, res, next) => {
    try {
        const newComment = await commentArticle(req, res);
        return res.status(201).json(newComment);
    } catch (err) {
        next(err);
    };
});


module.exports = commentRouter;