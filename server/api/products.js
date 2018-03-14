'use strict';

const router = require('express').Router();
const { Product, Category, Review } = require('../db/models');
const { isAdmin } = require('../gatekeeper.js');
module.exports = router;

router.get('/', (req, res, next) => {
    let filter = {
        include: [{
            model: Category
        }]
    };
    if ("category" in req.query) {
        const category = +req.query.category;

        // basically does WHERE product.category.id = category. bc of the many to many
        filter = {
            include: [{
                model: Category,
                through: {
                    where: {
                        categoryId: category
                    }
                },
                required: true
            }]
        }
    }
    Product.findAll(filter)
        .then(products => {
            res.json(products)
        })
        .catch(next)
});

router.get('/:productId', (req, res, next) => {
    Product.findOne({
        where: {
            id: req.params.productId
        },
        include: [{
            model: Review,
            as: "reviews"
        },
        {
            model: Category,
            as: "categories"
        }]
    })
        .then(product => res.json(product))
        .catch(next)
});

router.post('/', isAdmin, (req, res, next) => {
    Product.create(req.body)
        .then(newProduct => {
            return newProduct.addCategory(req.body.categories)
        })
        .then(product => {
            res.json(product)
        })
        //res.status(201).json(newProduct))
        .catch(next)
});

router.put('/:productId', isAdmin, (req, res, next) => {
    //const categoryArray = [{productId: req.params.id, categoryId: 1}]
    Product.findById(req.params.productId)
        .then(product => {
            return product.update(req.body)
        })
        .then(updatedProduct => {
            return updatedProduct.addCategory(req.body.categories)
        })
        .then(() => {
            return Product.findById(req.params.productId)
        })
        .then(product => {
            res.json(product)
        })
        .catch(next)
});

router.delete('/:productId', isAdmin, (req, res, next) => {
    Product.destroy({ where: { id: req.params.productId } })
        .then(() => res.status(204).send(''))
        .catch(next)
});
