const express = require('express');
const {
    commentRecipe,
    commentArticle,
    replyToComment,
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

commentRouter.post('/comment/reply', checkUserAuth, async (req, res, next) => {
    try {
        const newReply = await replyToComment(req, res);
        return res.status(201).json(newReply);
    } catch (err) {
        next(err);
    };
});


module.exports = commentRouter;