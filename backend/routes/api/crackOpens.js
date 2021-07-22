const express = require('express');
const asyncHandler = require('express-async-handler');
const { check }  = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const { IPA, User, CrackOpen} = require('../../db/models');

const router = express.Router();

const validateReview = [
    check('comment')
        .exists({ checkFalsy: true })
        .withMessage('Please add your review of the beer.'),
    handleValidationErrors,
];

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    try {
        const review = await CrackOpen.findByPk(id,{
            include: [User, IPA]
        });
        res.json(review);
    } catch(err) {
        next(err);
    }
}));

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        try {
            const reviews = await CrackOpen.findAll({
                include: [User, IPA]
            });
            res.json(reviews);
        } catch (err) {
            next(err);
        }
    }));

router.post(
    '/',
    validateReview,
    requireAuth,
    asyncHandler( async (req, res, next) => {
    const { userId, ipaId, comment } = req.body;


    const newReview = await CrackOpen.create({
        userId,
        ipaId,
        comment
    });

    return res.json(newReview);
}));

router.put(
    '/:id(\\d+)',
    validateReview,
    requireAuth,
    asyncHandler( async (req, res, next) => {
        const id = req.params.id;
        const review = await CrackOpen.findByPk(id);

        const newReview = await review.update(req.body);

        return res.json(newReview);
    }));

router.delete(
    '/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res, next) => {
        const id = req.params.id;
        const review = await CrackOpen.findByPk(id);
        if (review) {
            await review.destroy();
        }

        return res.json(review);
    }));

module.exports = router;
