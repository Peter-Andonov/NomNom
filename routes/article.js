const express = require('express');
const {
    createArticle,
    getArticleById,
    updateArticle,
    deleteArticle,
    getAllArticles,
} = require('../controllers/article');
const {
    checkAdminAuth,
} = require('../controllers/user');
const articleRouter = express.Router();


articleRouter.get('/article/all', async (req, res, next) => {
    try {
        const articles = await getAllArticles(req, res);
        return res.status(200).json(articles);
    } catch (err) {
        next(err);
    };
});

articleRouter.post('/article', checkAdminAuth, async (req, res, next) => {
    try {
        const newArticle = await createArticle(req, res);
        return res.status(201).json(newArticle);
    } catch (err) {
        next(err);
    };
});

articleRouter.get('/article', async (req, res, next) => {
    try {
        const article = await getArticleById(req, res);

        if (!article) {
            return res.status(404).json({
                message: "Article with the requested id does not exist"
            });
        };

        return res.status(200).json(article);
    } catch (err) {
        next(err);
    };
});

articleRouter.patch('/article', checkAdminAuth, async (req, res, next) => {
    try {
        const updatedArticle = await updateArticle(req, res);

        if (!updatedArticle) {
            return res.status(404).json({
                message: "Article with the requested id does not exist"
            });
        };

        return res.status(200).json(updatedArticle);
    } catch (err) {
        next(err);
    };
});

articleRouter.delete('/article', checkAdminAuth, async (req, res, next) => {
    try {
        const deletedArticle = await deleteArticle(req, res);

        if (!deletedArticle) {
            return res.status(404).json({
                message: "Article with the requested id does not exist"
            });
        };

        return res.status(200).json(deletedArticle);
    } catch (err) {
        next(err);
    };
});


module.exports = articleRouter;