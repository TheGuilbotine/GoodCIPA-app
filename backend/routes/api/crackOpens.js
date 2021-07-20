const express = require('express');
const asyncHandler = require('express-async-handler');
const { check }  = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { IPA, User, CrackOpen} = require('../../db/models');

const router = express.Router();

const validateReview = [
    check('comment')
        .exists({ checkFalsy: true })
        .withMessage('Please add the name of your review of the beer.'),
    handleValidationErrors,
];

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

router.post('/', validateReview, asyncHandler( async (req, res, next) => {
    const { comment } = req.body;
    const userId = req.user.id;
    const ipaId = req.ipa.id;

    try {
        const newReview = await CrackOpen.create({
            userId,
            ipaId,
            comment
        });

        res.json(newReview);
    } catch(err) {
        next(err);
    }
}));

module.exports = router;
