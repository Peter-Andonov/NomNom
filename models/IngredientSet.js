const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Number, ObjectId} = Schema.Types


const ingredientSetSchema = Schema({
    quantities: [{
        type: Number,
    }],
    units: [{
        type: ObjectId,
        ref: "Unit"
    }],
    ingredients: [{
        type: ObjectId,
        ref: "Ingredient"
    }]
});


module.exports = mongoose.model("IngredientSet", ingredientSetSchema);