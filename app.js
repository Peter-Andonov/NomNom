const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mainConfig = require('./config/express');
const routeConfig = require('./config/routes');
const errorHandler = require('./config/errorHandler');

//Setup environment variables
dotenv.config()
const PORT = process.env.PORT || 5000;

//Connect to Mongo
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to MongoDB");

    const app = express();

    mainConfig(app);
    routeConfig(app);
    errorHandler(app);

    app.listen(PORT, console.log(`Server listening on port ${PORT}`));
}).catch((err) => {
    console.log(err);
})

