const express = require('express');
const {
    createRecipe,
    getRecipeById,
    deleteRecipe,
    getAllRecipes,
    addRecipeToFavourites,
} = require('../controllers/recipe');
const {
    checkUserAuth
} = require('../controllers/user');
const recipeRouter = express.Router();


recipeRouter.get('/recipe/all', async (req, res, next) => {
    try {
        const recipes = await getAllRecipes(req, res);
        return res.status(200).json(recipes);
    } catch (err) {
        next(err)
    };
});

recipeRouter.post('/recipe', async (req, res, next) => {
    try {
        const newRecipe = await createRecipe(req, res);
        return res.status(201).json(newRecipe);
    } catch (err) {
        next(err);
    };
});

recipeRouter.post('/recipe/favourites', checkUserAuth, async (req, res, next) => {
    try {
        const updatedUser = await addRecipeToFavourites(req, res);
        return res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    };
});

recipeRouter.get('/recipe', async (req, res, next) => {
    try {
        const recipe = await getRecipeById(req, res);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe with the requested id does not exist"
            });
        }

        return res.status(200).json(recipe);
    } catch (err) {
        next(err);
    };
});

// TODO: Add update route for recipe

recipeRouter.delete('/recipe', async (req, res, next) => {
    try {
        const deletedRecipe = await deleteRecipe(req, res);

        if (!deletedRecipe) {
            return res.status(404).json({
                message: "Recipe with the requested id does not exist"
            });
        }

        return res.status(200).json(deletedRecipe);
    } catch (err) {
        next(err);
    };
});


module.exports = recipeRouter;