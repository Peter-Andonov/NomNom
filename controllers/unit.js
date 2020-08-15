const mongoose = require('mongoose');
const Unit = require('../models/Unit');


createUnit = async (req, res) => {

    const name = req.body.name.trim();
    await validateUnitName(name);

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
    const name = req.body.name.trim();

    await validateUnitName(name, id);

    const updatedData = {};
    updatedData.name = name;

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


validateUnitName = async (name, id) => {

    if(!name) {
        const error = new Error("Unit name must be provided");
        error.statusCode = 400;
        throw error;
    };

    const dupName = await Unit.findOne({name: name});

    if(dupName && (id === dupName._id.toString())) {
        return true;
    };

    if (dupName) {
        const error = new Error("There is already a unit with that name");
        error.statusCode = 400;
        throw error;
    };
};


module.exports = {
    createUnit,
    getUnitById,
    updateUnit,
    deleteUnit,
    getAllUnits,
}