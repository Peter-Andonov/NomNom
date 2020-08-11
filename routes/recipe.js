const express = require('express');
const {
    createRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getAllRecipes,
    addRecipeToFavourites,
    removeRecipeFromFavourites
} = require('../controllers/recipe');
const {
    checkUserAuth,
    checkAdminAuth
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

recipeRouter.post('/recipe', checkAdminAuth, async (req, res, next) => {
    try {
        const newRecipe = await createRecipe(req, res);
        return res.status(201).json(newRecipe);
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

recipeRouter.patch('/recipe', checkAdminAuth, async (req, res, next) => {
    try {
        const recipe = await updateRecipe(req, res);

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

recipeRouter.delete('/recipe', checkAdminAuth, async (req, res, next) => {
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

recipeRouter.post('/recipe/like', checkUserAuth, async (req, res, next) => {
    try {
        const updatedUser = await addRecipeToFavourites(req, res);
        return res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    };
});

recipeRouter.post('/recipe/dislike', checkUserAuth, async (req, res, next) => {
    try {
        const updatedUser = await removeRecipeFromFavourites(req, res);
        return res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    };
});


module.exports = recipeRouter;