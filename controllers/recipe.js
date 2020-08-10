const mongoose = require('mongoose');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const IngredientSet = require('../models/IngredientSet');
const { ObjectId } = mongoose.Types;

createRecipe = async (req, res) => {
    const title = req.body.title;
    const coverImageUrl = req.body.coverImageUrl;
    const shortDescription = req.body.shortDescription;
    const stepsToCreate = req.body.stepsToCreate;
    const ingredientSections = req.body.ingredientSections;
    const prepTime = req.body.prepTime;
    const cookTime = req.body.cookTime;
    const serves = req.body.serves;
    const difficulty = req.body.difficulty;

    const newIngredientSets = await Promise.all(ingredientSections.map(async (section) => {
        return createIngredientSet(section);
    }));

    const newIngredientSetIds = newIngredientSets.map((set) => {
        return set._id;
    });

    const newRecipe = new Recipe({
        title,
        coverImageUrl,
        shortDescription,
        stepsToCreate,
        ingredientSets: newIngredientSetIds,
        prepTime,
        cookTime,
        serves,
        difficulty,
        createdBy: ObjectId(req.userId)
    });

    const saved = await newRecipe.save();

    return saved;
};

getRecipeById = async (req, res) => {
    const recipeId = req.query.id;

    const recipe = Recipe.findById(recipeId)
        .populate(
            {
                path: 'ingredientSets',
                populate: {
                    path: 'units',
                    model: 'Unit',
                }
            }
        ).populate(
            {
                path: 'ingredientSets',
                populate: {
                    path: 'ingredients',
                    model: 'Ingredient',
                }
            }
        ).populate(
            {
                path: 'comments',
                populate: {
                    path: 'createdBy',
                    model: 'User',
                }
            }
        ).populate(
            {
                path: 'comments',
                populate: {
                    path: 'replies',
                    populate: {
                        path: 'createdBy',
                        model: 'User',
                    },
                    options: { sort: { 'createdAt': 'desc' }}
                },
                options: { sort: { 'createdAt': 'desc' }}
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

getAllRecipes = async (req, res) => {
    const page = req.query.page;
    const perPage = Number(req.query.perPage);

    const recipes = await Recipe.find({}).sort({ 'createdAt': 'desc' }).skip((page - 1) * perPage).limit(perPage).lean();

    const totalRecipesCount = await Recipe.countDocuments();

    return data = { recipes, totalRecipesCount };
};

addRecipeToFavourites = async (req, res) => {
    const userId = req.userId;

    const recipeId = req.body.recipeId;

    const updatedUser = await User.findByIdAndUpdate(ObjectId(userId), {
        $addToSet: {
            favouriteRecipes: [ObjectId(recipeId)]
        }
    }, {
        new: true
    });

    await Recipe.findByIdAndUpdate(ObjectId(recipeId), {
        $addToSet: {
            usersLiked: [ObjectId(userId)]
        }
    });

    return updatedUser;
};

createIngredientSet = async (body) => {
    const name = body.name;
    const quantities = body.quantities;
    const units = body.units;
    const ingredients = body.ingredients;

    const newIngredientSet = new IngredientSet({
        name,
        quantities,
        units,
        ingredients
    });

    try {
        return await newIngredientSet.save();
    } catch (err) {
        console.error(err);
    };
};


module.exports = {
    createRecipe,
    getAllRecipes,
    deleteRecipe,
    getRecipeById,
    addRecipeToFavourites,
};