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
    };
};

getUser = async (req, res) => {
    const userId = req.userId;

    const userData = await User.findById(userId).populate(
        {
            path: 'favouriteRecipes',
            model: 'Recipe'
        }
    ).lean();

    return res.status(200).json(userData);
}

updateUser = async (req, res) => {
    const id = req.body.id;
    const updatedData = {};

    if (req.body.firstName) {
        updatedData.firstName = req.body.firstName;
    };

    if (req.body.lastName) {
        updatedData.lastName = req.body.lastName;
    };

    if (req.body.profilePicUrl) {
        updatedData.profilePicUrl = req.body.profilePicUrl;
    };

    validateName(updatedData.firstName);
    validateName(updatedData.lastName);

    const updated = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (updated) {

        return res.status(200).json(updated);

    } else {
        const error = new Error("No such user exists");
        error.statusCode = 400;
        throw error;
    };
};

verifyLogin = (req, res) => {
    const token = req.body.token;

    if (!token) {
        const error = new Error("Token must be provided");
        error.statusCode = 400;
        throw error;
    };

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            const error = new Error("Invalid token");
            error.statusCode = 400;
            throw error;
        } else {
            userId = decoded.id;

            User.findOne({ _id: userId }, (err, user) => {
                if (err) {
                    const error = new Error("Cannot find user with the given id");
                    error.statusCode = 400;
                    throw error;
                } else {
                    return res.status(200).json(user);
                }
            });
        };
    });
};

checkUserAuth = (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        const error = new Error("Authorization token must be provided");
        error.statusCode = 401;
        throw error;
    };

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            const error = new Error("Invalid authorization token");
            error.statusCode = 401;
            throw error;
        } else {
            req.userId = decoded.id
            next();
        };
    });
};

checkAdminAuth = (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        const error = new Error("Authorization token must be provided");
        error.statusCode = 401;
        throw error;
    };

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            const error = new Error("Invalid authorization token");
            error.statusCode = 401;
            throw error;
        } else {
            if (decoded.role !== 'admin') {
                const error = new Error("You are not authorized to do that");
                error.statusCode = 401;
                throw error;
            } else {
                req.userId = decoded.id
                next();
            };
        };
    });
};


signJWTtoken = (user) => {
    const token = jwt.sign({
        id: user._id.toString(),
        role: user.role
    }, process.env.JWT_SECRET_KEY);

    return token;
};

validateEmail = async (email) => {

    if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        const error = new Error("Invalid email format");
        error.statusCode = 400;
        throw error;
    };

    dupEmail = await User.findOne({ email: email });

    if (dupEmail) {
        const error = new Error("Email is already in use");
        error.statusCode = 400;
        throw error;
    };
};

validatePasswords = (password, repeatPassword) => {
    if (password !== repeatPassword) {
        const error = new Error("Passwords do not match");
        error.statusCode = 400;
        throw error;
    };

    if (password.length < 6) {
        const error = new Error("Password must be at least 6 characters long");
        error.statusCode = 400;
        throw error;
    };

    if (!/^[A-Za-z0-9]+$/.test(password)) {
        const error = new Error("Password must contain only English characters and digits");
        error.statusCode = 400;
        throw error;
    };
};

validateName = (name) => {
    if (name.length < 2 || name.length > 20) {
        const error = new Error("Name must be between 2 and 20 characters long");
        error.statusCode = 400;
        throw error;
    };
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    verifyLogin,
    getUser,
    checkUserAuth,
    checkAdminAuth,
};