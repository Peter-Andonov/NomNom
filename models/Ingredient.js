const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { String, Date, ObjectId} = Schema.Types


const ingredientSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    createdOn: {
        type: Date,
        required: true
    },
    createdBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
});


module.exports = mongoose.model("Ingredient", ingredientSchema);