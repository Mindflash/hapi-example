'use strict';

const Lab = require('lab');
const Code = require('code');
const Chance = require('chance');
const { internals } = require('../routes');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
const aRandom = new Chance();

aRandom.mixin({product: () => {
    return {
        id: aRandom.integer(),
        name: aRandom.animal(),
        description: aRandom.sentence(),
        price: aRandom.floating({ fixed: 2, min: 1, max: 20000 })
    };
}})

const server = require('../server');

describe('Product Server', () => {
    describe('/products endpoints', () => {
        describe('GET /products', () => {
            const product1 = aRandom.product();
            const product2 = aRandom.product();
            internals.products = [product1, product2];

            it('handle naked request', (done) => {
                server.inject('/products', (res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.result[0]).to.deep.equal(product1);
                    expect(res.result[1]).to.deep.equal(product2);
                    done();
                })
            });
        });

        describe.skip('POST /products', () => {
            it('handle correct input', (done) => {
                internals.products = [];
                const product = aRandom.product();
                delete product.id;

                server.inject({url: '/products', method: 'POST', payload: product}, (res) => {
                    product.id = res.result.id;
                    expect(res.statusCode).to.equal(201);
                    expect(res.headers.location).to.equal(`/products/${product.id}`);
                    expect(res.result).to.deep.equal(product);
                    done();
                });
            });
        });
    });
});
