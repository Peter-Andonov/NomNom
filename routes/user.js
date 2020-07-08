const express = require('express');
const {
    registerUser,
    loginUser,
} = require('../controllers/user');
const userRouter = express.Router();


userRouter.post('/login', async (req, res, next) => {
    try {
        await loginUser(req, res);
    } catch (err) {
        next(err);
    }
});

userRouter.post('/register', async (req, res, next) => {
    try {
        await registerUser(req, res);
    } catch (err) {
        next(err);
    }
});


module.exports = userRouter;