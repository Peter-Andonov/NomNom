const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const { ObjectId } = mongoose.Types;


commentRecipe = async (req, res) => {
    const userId = ObjectId(req.userId);

    const recipeId = ObjectId(req.body.recipeId);
    const commentBody = req.body.commentBody;

    const newComment = new Comment({
        body: commentBody,
        createdBy: userId
    });

    const created = await newComment.save();

    await Recipe.findByIdAndUpdate(recipeId, {
        $addToSet: {
            comments: [created._id]
        }
    });

    return created;
};

commentArticle = async (req, res) => {
    const userId = ObjectId(req.userId);

    const articleId = ObjectId(req.body.articleId);
    const commentBody = req.body.commentBody;

    const newComment = new Comment({
        body: commentBody,
        createdBy: userId
    });

    const created = await newComment.save();

    await Article.findByIdAndUpdate(articleId, {
        $addToSet: {
            comments: [created._id]
        }
    });

    return created;
};


module.exports = {
    commentRecipe,
    commentArticle,
};