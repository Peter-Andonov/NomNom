const mongoose = require('mongoose');
const Unit = require('../models/Unit');


createUnit = async (req, res) => {
    const name = req.body.name

    const newUnit = new Unit({
        name
    });

    const saved = await newUnit.save();

    return saved;
};

getUnitById = async (req, res) => {
    const id = req.body.id;

    const unit = await Unit.findById(id).lean();

    return unit;
};

updateUnit = async (req, res) => {
    const id = req.body.id;
    const updatedData = {};

    if (req.body.name) {
        updatedData.name = req.body.name;
    }

    const updatedUnit = await Unit.findByIdAndUpdate(id, updatedData)

    return updatedUnit;
};

deleteUnit = async (req, res) => {
    const id = req.body.id;

    const deletedUnit = await Unit.findByIdAndDelete(id);

    return deletedUnit;
}

getAllUnits = async () => {
    const units = await Unit.find({}).sort({ 'name': 'asc' }).lean();

    return units;
};


module.exports = {
    createUnit,
    getUnitById,
    updateUnit,
    deleteUnit,
    getAllUnits,
}