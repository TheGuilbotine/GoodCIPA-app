const express = require('express');
const asyncHandler = require('express-async-handler');
const { check }  = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const { IPA, User} = require('../../db/models');

const router = express.Router();

const validateIpa = [
    // check('userId')
    // .exists({ checkFalsy: true })
    // .withMessage('Must be signed in.'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please add the name of your beer.')
        .isLength({max: 70})
        .withMessage('Are you sure the name of your beer is that long.'),
    check('imageUrl')
        .exists({ checkFalsy: true })
        .withMessage('Please add an image.')
        .isLength({max: 255})
        .withMessage('Try to find an image link with a shorter URL length.'),
    check('brewery')
        .exists({ checkFalsy: true })
        .withMessage('Please add a Brewery.')
        .isLength({ max: 100 })
        .withMessage('That\'s a crazy long Brewery name.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Leave a little description of the beer.'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Please add the country the beer is from.')
        .isLength({ max: 56 })
        .withMessage('Please enter a proper Country name length.'),
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage('Please rate your beer.')
        .isDecimal({ decimal_digits: 1})
        .withMessage('Rating needs to be between 1 and 10 and includes half ratings. ex: (XX.X)'),
    check('ABV')
        .exists({ checkFalsy: true })
        .withMessage('Please add the alcohol content.')
        .isDecimal({ decimal_digits: 1})
        .withMessage('Alcohol content needs to be between 1 and 10 and includes half ratings. ex: (XX.X)'),
    handleValidationErrors,
];

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    try {
        const ipa = await IPA.findByPk(id,{
            include: [User]
        });
        res.json(ipa);
    } catch(err) {
        next(err);
    }
}));

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        try {
            const ipas = await IPA.findAll({
                include: [User]
            });
            res.json(ipas);
        } catch (err) {
            next(err);
        }
    }));

router.post(
    '/',
    validateIpa,
    requireAuth,
    asyncHandler( async (req, res, next) => {
    const { userId, name, imageUrl, brewery, breweryLink, description, country, rating, ABV } = req.body;

    try {
        const newIpa = await IPA.create({
            userId,
            name,
            imageUrl,
            brewery,
            breweryLink,
            description,
            country,
            rating,
            ABV
        });

        res.json(newIpa);
    } catch(err) {
        next(err);
    }
}));

router.put(
    '/:id(\\d+)',
    validateIpa,
    requireAuth,
    asyncHandler( async (req, res, next) => {
        const id = req.params.id;
        const ipa = await IPA.findByPk(id);
        try {
            const newIpa = await ipa.update(req.body);

            res.json(newIpa);
        } catch(err) {
            next(err);
        }
    }));

router.delete(
    '/:id(\\d+)',
    requireAuth,
    asyncHandler(async (req, res, next) => {
        const id = req.params.id;
        const ipa = await IPA.findByPk(id);
        try {
            await ipa.destroy();

            res.json(ipa);
        } catch(err) {
            next(err);
        }
    }));

module.exports = router;
