'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Lout = require('lout');
const Vision = require('vision');
const Routes = require('./routes').routes;

const config = {};
const server = new Hapi.Server(config);

const port = 8080;
const host = '0.0.0.0';
server.connection({ port, host });

const loutRegister = {
    register: Lout,
    options: { endpoint: '/docs' }
};

server.register([Vision, Inert, loutRegister], err => {
    if (err) {
        console.error('Failed loading plugins');
        process.exit(1);
    }

    server.route(Routes);
    
    server.start(() => console.log('Server running at:', server.info.uri));
});

module.exports = server;
