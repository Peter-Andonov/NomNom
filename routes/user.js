const express = require('express');
const {
    registerUser,
    loginUser,
    verifyLogin,
    updateUser,
    getUser,
    checkUserAuth
} = require('../controllers/user');
const userRouter = express.Router();


userRouter.post('/login', async (req, res, next) => {
    try {
        await loginUser(req, res);
    } catch (err) {
        next(err);
    };
});

userRouter.post('/verifylogin', async (req, res, next) => {
    try {
        await verifyLogin(req, res);
    } catch (err) {
        next(err);
    };
});

userRouter.get('/user', checkUserAuth, async (req, res, next) => {
    try {
        await getUser(req, res);
    } catch (err) {
        next(err);
    }
})

userRouter.patch('/user', async (req, res, next) => {
    try {
        await updateUser(req, res);
    } catch (err) {
        next(err);
    };
});

userRouter.post('/register', async (req, res, next) => {
    try {
        await registerUser(req, res);
    } catch (err) {
        next(err);
    };
});


module.exports = userRouter;