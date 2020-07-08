const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const IngredientSet = require('../models/IngredientSet');

createRecipe = async (req, res) => {
    const title = req.body.title.trim();
    const description = req.body.description.trim();
    const imageUrl = req.body.imageUrl.trim();
    const steps = req.body.steps;
    const servings = req.body.servings;
    const prepTime = req.body.prepTime;
    const cookTime = req.body.cookTime;
    const calories = req.body.calories;
    const category = req.body.category;


    const newIngredientSet = await createIngredientSet(req.body);

    const newRecipe = new Recipe({
        title,
        description,
        imageUrl,
        steps,
        ingredientSet: newIngredientSet._id,
        servings,
        prepTime,
        cookTime,
        calories,
        category,
        createdOn: new Date(),
        createdBy: mongoose.Types.ObjectId(req.body.createdBy)
    });


    const saved = await newRecipe.save();

    return saved;
};

getRecipeById = async (req, res) => {
    const recipeId = req.body.id;

    const recipe = Recipe.findById(recipeId)
        .populate(
            {
                path: 'ingredientSet',
                populate: {
                    path: 'units',
                    model: 'Unit',
                }
            }
        )
        .populate(
            {
                path: 'ingredientSet',
                populate: {
                    path: 'ingredients',
                    model: 'Ingredient',
                }
            }
        ).lean();

    return recipe;
};

// TODO: add a update controller

deleteRecipe = async (req, res) => {
    const id = req.body.id;

    const deleted = await Recipe.findByIdAndDelete(id);

    return deleted;
};

getAllRecipes = async () => {
    const recipes = await Recipe.find({}).lean();

    return recipes;
};

createIngredientSet = async (body) => {
    const quantities = body.quantities;
    const units = body.units;
    const ingredients = body.ingredients;

    const newIngredientSet = new IngredientSet({
        quantities,
        units,
        ingredients
    })

    try {
        return await newIngredientSet.save();
    } catch (err) {
        console.error(err);
    }
};


module.exports = {
    createRecipe,
    getAllRecipes,
    deleteRecipe,
    getRecipeById,
}