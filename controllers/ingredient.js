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
        updatedData.description = req.body.description;
    }

    const updated = await Ingredient.findByIdAndUpdate(id, updatedData);

    return updated;
};

deleteIngredient = async (req, res) => {
    const id = req.query.id;

    const deleted = await Ingredient.findByIdAndDelete(id);

    return deleted;
};

getAllIngredients = async (req, res) => {
    const search = req.query.search;
    const page = req.query.page;
    const perPage = Number(req.query.perPage);
    const sortCrit = req.query.sortCrit;
    const sortOrd = req.query.sortOrd;

    const sortObj = {};
    sortObj[sortCrit] = sortOrd;

    const ingredients = await Ingredient.find({'name' : new RegExp(search, 'i')})
    .sort(sortObj)
    .skip((page - 1) * perPage)
    .limit(perPage).lean();

    const totalIngredientsCount = await Ingredient.countDocuments();

    const data = { ingredients, totalIngredientsCount };

    return data;
};


module.exports = {
    createIngredient,
    getIngredientById,
    updateIngredient,
    deleteIngredient,
    getAllIngredients,
}