const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const Reply = require('../models/Reply');
const { ObjectId } = mongoose.Types;


commentRecipe = async (req, res) => {
    const userId = ObjectId(req.userId);

    const recipeId = ObjectId(req.body.entityId);
    const commentBody = req.body.commentBody;

    validateCommentLength(commentBody);

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

    return Comment.findById(created._id).populate({path: "createdBy"});
};

commentArticle = async (req, res) => {
    const userId = ObjectId(req.userId);

    const articleId = ObjectId(req.body.entityId);
    const commentBody = req.body.commentBody;

    validateCommentLength(commentBody);

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

    return Comment.findById(created._id).populate({path: "createdBy"});
};

replyToComment = async (req, res) => {
    const userId = ObjectId(req.userId);

    const commentId = ObjectId(req.body.commentId);
    const replyBody = req.body.replyBody;

    validateReplyLength(replyBody);

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

    return Reply.findById(created._id).populate({path: "createdBy"});
};

validateCommentLength = (comment) => {
    if(!comment || comment.length > 300) {
        const error = new Error("Comment must be between 1 and 300 characters long");
        error.statusCode = 400;
        throw error;
    };
};

validateReplyLength = (reply) => {
    if(!reply || reply.length > 300) {
        const error = new Error("Reply must be between 1 and 300 characters long");
        error.statusCode = 400;
        throw error;
    };
};

module.exports = {
    commentRecipe,
    commentArticle,
    replyToComment,
};