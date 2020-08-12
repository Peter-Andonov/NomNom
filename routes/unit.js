const express = require('express');
const {
    createUnit,
    getUnitById,
    updateUnit,
    deleteUnit,
    getAllUnits,
} = require('../controllers/unit');
const {
    checkAdminAuth
} = require('../controllers/user');
const unitRouter = express.Router();


unitRouter.get('/unit/all', async (req, res, next) => {
    try {
        const units = await getAllUnits(req, res);
        return res.status(200).json(units);
    } catch (err) {
        next(err);
    }
});

unitRouter.post('/unit', checkAdminAuth, async (req, res, next) => {
    try {
        const newUnit = await createUnit(req, res);
        return res.status(201).json(newUnit);
    } catch (err) {
        next(err);
    }
});

unitRouter.get('/unit', async (req, res, next) => {
    try {
        const unit = await getUnitById(req, res);

        if (!unit) {
            return res.status(404).json({
                message: "Unit with the requested id does not exist"
            });
        }

        return res.status(200).json(unit);
    } catch (err) {
        next(err);
    }
});

unitRouter.patch('/unit', checkAdminAuth, async (req, res, next) => {
    try {
        const updatedUnit = await updateUnit(req, res);

        if (!updatedUnit) {
            return res.status(404).json({
                message: "Unit with the requested id does not exist"
            });
        }

        return res.status(200).json(updatedUnit);
    } catch (err) {
        next(err);
    };
});

unitRouter.delete('/unit', checkAdminAuth, async (req, res, next) => {
    try {
        const deletedUnit = await deleteUnit(req, res);

        if (!deletedUnit) {
            return res.status(404).json({
                message: "Unit with the requested id does not exist"
            });
        }

        return res.status(200).json(deletedUnit);
    } catch (err) {
        next(err);
    };
});


module.exports = unitRouter;