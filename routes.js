'use strict';

const Joi = require('joi');
const Chance = require('chance');

let internals = {};
const chance = new Chance();

internals.getProducts = (request, reply) => {
    if (request.query.name) {
        return reply(internals.findProducts(request.query.name));
    }
    reply(internals.products);
}

internals.findProducts = function(name) {
    return internals.products.filter(function(product) {
        return product.name === name;
    });
}

internals.getProduct = function(request, reply) {
    const filtered = internals.products.filter(function(product) {
        return product.id === parseInt(request.params.id);
    });
    reply(filtered.pop());
}

internals.addProduct = function(request, reply) {
    const product = {
        id: internals.products[internals.products.length - 1].id + 1,
        name: request.payload.name,
        description: request.payload.description,
        price: request.payload.price
    };

    internals.products.push(product);

    reply(product).created('/products/' + product.id);
}

internals.products = [];

// Populate the products with a variable amount of random data
const numProductsToCreate = chance.integer({ min: 100, max: 1000 })
for (let id = 0; id < numProductsToCreate; id++) {
    internals.products.push({
        id,
        name: chance.animal(),
        description: chance.sentence(),
        price: chance.floating({ fixed: 2, min: 1, max: 20000 })
    })
}

module.exports.internals = internals;

module.exports.routes = [{
    method: 'GET',
    path: '/products',
    config: {
        validate: {
            query: {
                name: Joi.string()
            }
        },
        handler: internals.getProducts
    }
}, {
    method: 'GET',
    path: '/products/{id}',
    handler: internals.getProduct
}, {
    method: 'POST',
    path: '/products',
    config: {
        validate: {
            payload: {
                name: Joi.string().required().min(3).max(100),
                description: Joi.string().min(5).max(1000),
                price: Joi.number().required().min(1).max(20000).precision(2)
            }
        },
        handler: internals.addProduct
    },
}];