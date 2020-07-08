const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { String, Number, Date, ObjectId} = Schema.Types

const recipeSchema = Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    steps: [{
        type: String,
    }],
    ingredientSet: {
        type: ObjectId,
        ref: 'IngredientSet'
    },
    servings: {
        type: Number,
    },
    prepTime: {
        type: Number,
    },
    cookTime: {
        type: Number,
    },
    calories: {
        type: Number,
    },
    category: {
        type: String,
        required: true
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


module.exports = mongoose.model("Recipe", recipeSchema);