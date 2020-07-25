const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { String, ObjectId} = Schema.Types

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: "user"
    },
    favouriteRecipes: [{
        type: ObjectId,
        ref: 'Recipe',
    }]
});

module.exports = mongoose.model("User", userSchema);