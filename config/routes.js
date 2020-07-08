const userRouter = require('../routes/user');
const unitRouter = require('../routes/unit');
const ingredientRouter = require('../routes/ingredient');
const recipeRouter = require('../routes/recipe');

module.exports = (app) => {
    app.use('/api', userRouter);
    app.use('/api', unitRouter);
    app.use('/api', ingredientRouter);
    app.use('/api', recipeRouter);
};