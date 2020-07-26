const express = require('express');
const cors = require('cors');

module.exports = (app) => {
    app.use(cors({
        exposedHeaders: 'Authorization'
    }))
    //Setup json request parser
    app.use(express.json());

};