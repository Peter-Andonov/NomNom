const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { String, Number, ObjectId} = Schema.Types

const recipeSchema = Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    shortDescription: {
        type: String
    },
    coverImageUrl: {
        type: String
    },
    stepsToCreate: {
        type: String
    },
    ingredientSets: [{
        type: ObjectId,
        ref: 'IngredientSet'
    }],
    prepTime: {
        type: Number,
    },
    cookTime: {
        type: Number,
    },
    serves: {
        type: Number,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard']
    },
    usersLiked: [{
        type: ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps: true });


module.exports = mongoose.model("Recipe", recipeSchema);