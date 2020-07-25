const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

registerUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;

    await validateEmail(email);
    validatePasswords(password, repeatPassword);

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
        email,
        password: hashedPass,
    });

    const registeredUser = await newUser.save();

    const token = signJWTtoken(registeredUser);

    return res.status(200).header("Authorization", token).json(registeredUser);
};

loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 400;
        throw error;
    };

    const result = await bcrypt.compare(password, user.password);

    if (result) {
        const token = signJWTtoken(user);

        return res.status(200).header("Authorization", token).json(user);

    } else {
        const error = new Error("Invalid email or password");
        error.statusCode = 400;
        throw error;
    }
}

checkUserAuth = (req, res, next) => {
    const token = req.cookies['aid'];

    if (!token) {
        return res.redirect('/');
    };

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.redirect('/');
        } else {
            req.user = {
                id: decoded.id,
                username: decoded.username,
                role: decoded.role,
                isLoggedIn: true
            }
            next();
        };
    });
};

signJWTtoken = (user) => {
    const token = jwt.sign({
        id: user._id.toString()
    }, process.env.JWT_SECRET_KEY);

    return token;
}

validateEmail = async (email) => {

    if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        const error = new Error("Invalid email format");
        error.statusCode = 400;
        throw error;
    }

    dupEmail = await User.findOne({ email: email });

    if (dupEmail) {
        const error = new Error("Email is already in use");
        error.statusCode = 400;
        throw error;
    }
}

validatePasswords = (password, repeatPassword) => {
    if (password !== repeatPassword) {
        const error = new Error("Passwords do not match");
        error.statusCode = 400;
        throw error;
    }

    if (password.length < 6) {
        const error = new Error("Password must be at least 6 characters long");
        error.statusCode = 400;
        throw error;
    }

    if (!/^[A-Za-z0-9]+$/.test(password)) {
        const error = new Error("Password must contain only English characters and digits");
        error.statusCode = 400;
        throw error;
    }
}

module.exports = {
    registerUser,
    loginUser,
    checkUserAuth,
};