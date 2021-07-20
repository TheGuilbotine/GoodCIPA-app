const express = require("express");
const asyncHandler = require("express-async-handler");
const { check }  = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { IPA, User, CrackOpen} = require('../../db/models');

const router = express.Router();

router.get(':id(\\d+)', asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);

    try {
        const crackOpen = await CrackOpen.findByPk(id,{
            include: [User, IPA]
        });
        req.json(crackOpen);
    } catch(err) {
        next(err);
    }
}));

router.get('/', asyncHandler(async (req, res, next) => {
    try {
        const crackOpens = await CrackOpen.findAll({
            include: [User, IPA]
        });
        res.json(crackOpens);
    } catch (err) {
        next(err);
    }
}));

module.exports = router;
