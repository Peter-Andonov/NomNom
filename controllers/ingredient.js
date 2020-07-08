const mongoose = require('mongoose');
const Ingredient = require('../models/Ingredient');
const { ObjectId } = mongoose.Types;

createIngredient = async (req, res) => {
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const shortDescription = req.body.shortDescription;
    const longDescription = req.body.longDescription;

    const newIngredient = new Ingredient({
        name,
        imageUrl,
        shortDescription,
        longDescription,
        createdOn: new Date(),
        createdBy: ObjectId(req.body.userId)
    });

    const saved = await newIngredient.save();

    return saved;
};

getIngredientById = async (req, res) => {
    const id = req.body.id;

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

    if (req.body.shortDescription) {
        updatedData.shortDescription = req.body.shortDescription;
    }

    if (req.body.longDescription) {
        updatedData.longDescription = req.body.longDescription;
    }

    const updated = await Ingredient.findByIdAndUpdate(id, updatedData);

    return updated;
};

deleteIngredient = async (req, res) => {
    const id = req.body.id;

    const deleted = await Ingredient.findByIdAndDelete(id);

    return deleted;
};

getAllIngredients = async () => {
    const ingredients = await Ingredient.find({}).lean();

    return ingredients;
};


module.exports = {
    createIngredient,
    getIngredientById,
    updateIngredient,
    deleteIngredient,
    getAllIngredients,
}