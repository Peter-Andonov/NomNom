const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Mixed, String, Number, Date, ObjectId} = Schema.Types

const recipeSchema = Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    shortDescription: {
        type: Mixed
    },
    coverImageUrl: {
        type: String
    },
    stepsToCreate: {
        type: Mixed
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
    createdBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps: true });


module.exports = mongoose.model("Recipe", recipeSchema);