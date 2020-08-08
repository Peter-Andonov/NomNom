const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { String, ObjectId} = Schema.Types

const commentSchema = Schema({
    body: {
        type: String,
        required: true,
        maxlength: 300
    },
    replies: [{
        type: ObjectId,
        ref: 'Reply'
    }],
    createdBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps: true });


module.exports = mongoose.model("Comment", commentSchema);