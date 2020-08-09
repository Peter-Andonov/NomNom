const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { String, ObjectId } = Schema.Types;


const articleSchema = Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String
    },
    body: {
        type: String
    },
    createdBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }]
},{ timestamps: true });


module.exports = mongoose.model("Article", articleSchema);