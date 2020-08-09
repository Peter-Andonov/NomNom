const express = require('express');
const {
    createIngredient,
    getIngredientById,
    updateIngredient,
    deleteIngredient,
    getAllIngredients,
} = require('../controllers/ingredient');
const {
    checkAdminAuth,
} = require('../controllers/user');
const ingredientRouter = express.Router();


ingredientRouter.get('/ingredient/all', async (req, res, next) => {
    try {
        const ingredients = await getAllIngredients();
        return res.status(200).json(ingredients);
    } catch (err) {
        next(err)
    };
});

ingredientRouter.post('/ingredient', checkAdminAuth, async (req, res, next) => {
    try {
        const newIngredient = await createIngredient(req, res);
        return res.status(201).json(newIngredient);
    } catch (err) {
        next(err);
    };
});

ingredientRouter.get('/ingredient', async (req, res, next) => {
    try {
        const ingredient = await getIngredientById(req, res);

        if (!ingredient) {
            return res.status(404).json({
                message: "Ingredient with the requested id does not exist"
            });
        }

        return res.status(200).json(ingredient);
    } catch (err) {
        next(err);
    };
});

ingredientRouter.patch('/ingredient', checkAdminAuth, async (req, res, next) => {
    try {
        const updatedIngredient = await updateIngredient(req, res);

        if (!updatedIngredient) {
            return res.status(404).json({
                message: "Ingredient with the requested id does not exist"
            });
        }

        return res.status(200).json(updatedIngredient);
    } catch (err) {
        next(err);
    };
});

ingredientRouter.delete('/ingredient', checkAdminAuth, async (req, res, next) => {
    try {
        const deletedIngredient = await deleteIngredient(req, res);

        if (!deletedIngredient) {
            return res.status(404).json({
                message: "Ingredient with the requested id does not exist"
            });
        }

        return res.status(200).json(deletedIngredient);
    } catch (err) {
        next(err);
    };
});


module.exports = ingredientRouter;