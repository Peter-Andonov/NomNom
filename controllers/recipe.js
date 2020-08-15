const mongoose = require('mongoose');
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const IngredientSet = require('../models/IngredientSet');
const { ObjectId } = mongoose.Types;

createRecipe = async (req, res) => {

    await validateRecipeName(req.body.title);
    validateRecipeDifficulty(req.body.difficulty);
    validateIngredientSections(req.body.ingredientSections);

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

updateRecipe = async (req, res) => {
    const recipeId = req.body.id;

    await validateRecipeName(req.body.title, recipeId);
    validateRecipeDifficulty(req.body.difficulty);
    validateIngredientSections(req.body.ingredientSections);

    const updatedRecipeData = {};

    if(req.body.title){
        updatedRecipeData.title = req.body.title;
    }
    if(req.body.coverImageUrl){
        updatedRecipeData.coverImageUrl = req.body.coverImageUrl;
    }
    if(req.body.shortDescription){
        updatedRecipeData.shortDescription = req.body.shortDescription;
    }
    if(req.body.stepsToCreate){
        updatedRecipeData.stepsToCreate = req.body.stepsToCreate;
    }
    if(req.body.prepTime){
        updatedRecipeData.prepTime = req.body.prepTime;
    }
    if(req.body.cookTime){
        updatedRecipeData.cookTime = req.body.cookTime;
    }
    if(req.body.serves){
        updatedRecipeData.serves = req.body.serves;
    }

    updatedRecipeData.difficulty = req.body.difficulty;

    const ingredientSections = req.body.ingredientSections;

    const newIngredientSets = await Promise.all(ingredientSections.map(async (section) => {
        return createIngredientSet(section);
    }));

    const newIngredientSetIds = newIngredientSets.map((set) => {
        return set._id;
    });

    updatedRecipeData.ingredientSets = newIngredientSetIds;

    const updated = await Recipe.findByIdAndUpdate(recipeId, updatedRecipeData);

    return updated;
};

deleteRecipe = async (req, res) => {
    const recipeId = req.query.id;

    const deleted = await Recipe.findByIdAndDelete(recipeId);

    await User.updateMany({}, { $pull: { favouriteRecipes: deleted._id}});

    return deleted;
};

getAllRecipes = async (req, res) => {
    const search = req.query.search;
    const page = req.query.page;
    const perPage = Number(req.query.perPage);
    const sortCrit = req.query.sortCrit;
    const sortOrd = req.query.sortOrd;

    const sortObj = {};
    sortObj[sortCrit] = sortOrd;

    const recipes = await Recipe.find({'title' : new RegExp(search, 'i')})
    .sort(sortObj)
    .skip((page - 1) * perPage)
    .limit(perPage).lean();

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

removeRecipeFromFavourites = async (req, res) => {
    const userId = req.userId;

    const recipeId = req.body.recipeId;


    const updatedUser = await User.findByIdAndUpdate(ObjectId(userId), {
        $pull: {
            favouriteRecipes: ObjectId(recipeId)
        }
    }, {
        new: true
    });

    const updatedRecipe = await Recipe.findByIdAndUpdate(ObjectId(recipeId), {
        $pull: {
            usersLiked: ObjectId(userId)
        }
    });

    return updatedUser;
};

validateRecipeName = async (title, id) => {
    const dupTitle = await Recipe.findOne({title: title});

    if(dupTitle && (id === dupTitle._id.toString())) {
        return true;
    };

    if (dupTitle) {
        const error = new Error("There is already a recipe with that title");
        error.statusCode = 400;
        throw error;
    };
};

validateIngredientSections = (sections) => {
    sections.map((section) => {
        if (section.units.includes('') || section.ingredients.includes('')) {
            const error = new Error("Units and ingredients need to be provided for each row");
            error.statusCode = 400;
            throw error;
        };
    });
};

validateRecipeDifficulty = (difficulty) => {
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        const error = new Error("Recipe difficulty needs to be provided");
        error.statusCode = 400;
        throw error;
    };
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
    updateRecipe,
    deleteRecipe,
    getRecipeById,
    addRecipeToFavourites,
    removeRecipeFromFavourites,
};