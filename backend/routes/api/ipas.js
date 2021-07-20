const express = require("express");
const asyncHandler = require("express-async-handler");
const { check }  = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { IPA, User} = require('../../db/models');

const router = express.Router();

// router.get(':id(\\d+)', asyncHandler(async (req, res, next) => {
//     const id = parseInt(req.params.id);

//     try {
//         const ipa = await IPA.findByPk(id,{
//             include: [User]
//         });
//         req.json(ipa);
//     } catch(err) {
//         next(err);
//     }
// }));

router.get('/', asyncHandler(async (req, res, next) => {
    try {
        const ipas = await IPA.findAll({
            include: [User]
        });
        res.json(ipas);
    } catch (err) {
        next(err);
    }
}));

module.exports = router;
