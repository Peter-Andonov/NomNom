const mongoose = require('mongoose');
const Article = require('../models/Article');
const { ObjectId } = mongoose.Types;

createArticle = async (req, res) => {

    await validateArticleName(req.body.title);

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const body = req.body.body;

    const newArticle = new Article({
        title,
        imageUrl,
        body,
        createdOn: new Date(),
        createdBy: ObjectId(req.userId)
    });

    const saved = await newArticle.save();

    return saved;
};

getArticleById = async (req, res) => {
    const id = req.query.id;

    const article = Article.findById(id)
        .populate(
            {
                path: 'comments',
                populate: {
                    path: 'createdBy',
                    model: 'User',
                }
            }
        ).populate(
            {
                path: 'comments',
                populate: {
                    path: 'replies',
                    populate: {
                        path: 'createdBy',
                        model: 'User',
                    },
                    options: { sort: { 'createdAt': 'desc' } }
                },
                options: { sort: { 'createdAt': 'desc' } }
            }
        ).lean();

    return article;
};

updateArticle = async (req, res) => {

    const id = req.body.id;

    await validateArticleName(req.body.title, id);

    const updatedData = {};

    if (req.body.title) {
        updatedData.title = req.body.title;
    }

    if (req.body.imageUrl) {
        updatedData.imageUrl = req.body.imageUrl;
    }

    if (req.body.body) {
        updatedData.body = req.body.body;
    }

    const updated = await Article.findByIdAndUpdate(id, updatedData);

    return updated;
};

deleteArticle = async (req, res) => {
    const id = req.query.id;

    const deleted = await Article.findByIdAndDelete(id);

    return deleted;
};

getAllArticles = async (req, res) => {
    const search = req.query.search;
    const page = req.query.page;
    const perPage = Number(req.query.perPage);
    const sortCrit = req.query.sortCrit;
    const sortOrd = req.query.sortOrd;

    const sortObj = {};
    sortObj[sortCrit] = sortOrd;

    const articles = await Article.find({'title' : new RegExp(search, 'i')})
    .sort(sortObj)
    .skip((page - 1) * perPage)
    .limit(perPage).lean();

    const totalArticlesCount = await Article.countDocuments();

    const data = { articles, totalArticlesCount };

    return data;
};


validateArticleName = async (title) => {
    const dupTitle = await Article.findOne({title: title});

    if(dupTitle && (id === dupTitle._id.toString())) {
        return true;
    };

    if (dupTitle) {
        const error = new Error("There is already an article with that title");
        error.statusCode = 400;
        throw error;
    };
};


module.exports = {
    createArticle,
    getArticleById,
    updateArticle,
    deleteArticle,
    getAllArticles,
};