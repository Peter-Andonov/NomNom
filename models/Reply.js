const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { String, ObjectId} = Schema.Types

const replySchema = Schema({
    body: {
        type: String,
        required: true,
        maxlength: 300
    },
    createdBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps: true });


module.exports = mongoose.model("Reply", replySchema);