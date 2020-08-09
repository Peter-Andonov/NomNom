const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { String, ObjectId} = Schema.Types


const ingredientSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
    },
    description: {
        type: String,
    },
    createdBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps: true });


module.exports = mongoose.model("Ingredient", ingredientSchema);