const mongoose = require('mongoose');
const Ingredient = require('../models/Ingredient');
const { ObjectId } = mongoose.Types;

createIngredient = async (req, res) => {
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;

    const newIngredient = new Ingredient({
        name,
        imageUrl,
        description,
        createdBy: ObjectId(req.userId)
    });

    const saved = await newIngredient.save();

    return saved;
};

getIngredientById = async (req, res) => {
    const id = req.query.id;

    const ingredient = Ingredient.findById(id).lean();

    return ingredient;
};

updateIngredient = async (req, res) => {
    const id = req.body.id;
    const updatedData = {};

    if (req.body.name) {
        updatedData.name = req.body.name;
    }

    if (req.body.imageUrl) {
        updatedData.imageUrl = req.body.imageUrl;
    }

    if (req.body.description) {
        updatedData.shortDescription = req.body.description;
    }

    const updated = await Ingredient.findByIdAndUpdate(id, updatedData);

    return updated;
};

deleteIngredient = async (req, res) => {
    const id = req.query.id;

    const deleted = await Ingredient.findByIdAndDelete(id);

    return deleted;
};

getAllIngredients = async () => {
    const ingredients = await Ingredient.find({}).sort({ 'name': 'asc' }).lean();

    return ingredients;
};


module.exports = {
    createIngredient,
    getIngredientById,
    updateIngredient,
    deleteIngredient,
    getAllIngredients,
}