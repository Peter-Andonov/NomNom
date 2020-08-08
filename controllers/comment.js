const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Reply = require('../models/Reply');
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

replyToComment = async (req, res) => {
    const userId = ObjectId(req.userId);

    const commentId = ObjectId(req.body.commentId);
    const replyBody = req.body.replyBody;

    const newReply = new Reply({
        body: replyBody,
        createdBy: userId
    });

    const created = await newReply.save();

    await Comment.findByIdAndUpdate(commentId, {
        $addToSet: {
            replies: [created._id]
        }
    });

    return created;
};


module.exports = {
    commentRecipe,
    commentArticle,
    replyToComment,
};