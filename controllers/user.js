const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

registerUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;

    await validateUsername(username);
    validatePasswords(password, repeatPassword);

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        password: hashedPass,
    });

    const registeredUser = await newUser.save();

    const token = signJWTtoken(registeredUser);

    return res.status(200).json({
        token: token
    });
};

loginUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username
    });

    if (!user) {
        const error = new Error("Invalid username or password");
        error.statusCode = 400;
        throw error;
    };

    const result = await bcrypt.compare(password, user.password);

    if (result) {
        const token = signJWTtoken(user);

        return res.status(200).json({
            token: token
        })
    } else {
        const error = new Error("Invalid username or password");
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
        id: user._id.toString(),
        username: user.username
    },process.env.JWT_SECRET_KEY);

    return token;
}

validateUsername = async (username) => {
    if (username.length < 3) {
        const error = new Error("Username must be at least 3 characters long");
        error.statusCode = 400;
        throw error;
    }

    if (!/^[A-Za-z0-9]+$/.test(username)) {
        const error = new Error("Username must contain only English characters and digits");
        error.statusCode = 400;
        throw error;
    }

    dupUsername = await User.findOne({ username: username });

    if (dupUsername) {
        const error = new Error("Username already exists");
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

    if (password.length < 3) {
        const error = new Error("Password must be at least 3 characters long");
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