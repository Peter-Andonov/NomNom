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
    const id = req.query.id;

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
    const id = req.query.id;

    const deletedUnit = await Unit.findByIdAndDelete(id);

    return deletedUnit;
}

getAllUnits = async (req, res) => {
    const page = req.query.page;
    const perPage = Number(req.query.perPage);
    const sortCrit = req.query.sortCrit;
    const sortOrd = req.query.sortOrd;

    const sortObj = {};
    sortObj[sortCrit] = sortOrd;

    const units = await Unit.find({})
    .sort(sortObj)
    .skip((page - 1) * perPage)
    .limit(perPage).lean();

    const totalUnitsCount = await Unit.countDocuments();

    return data = { units, totalUnitsCount };
};


module.exports = {
    createUnit,
    getUnitById,
    updateUnit,
    deleteUnit,
    getAllUnits,
}