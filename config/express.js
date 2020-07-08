const express = require('express');

module.exports = (app) => {

    //Setup json request parser
    app.use(express.json());

};