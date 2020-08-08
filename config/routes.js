const userRouter = require('../routes/user');
const unitRouter = require('../routes/unit');
const ingredientRouter = require('../routes/ingredient');
const recipeRouter = require('../routes/recipe');
const articleRouter = require('../routes/article');
const commentRouter = require('../routes/comment');

module.exports = (app) => {
    app.use('/api', userRouter);
    app.use('/api', unitRouter);
    app.use('/api', ingredientRouter);
    app.use('/api', recipeRouter);
    app.use('/api', articleRouter);
    app.use('/api', commentRouter);
};