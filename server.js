'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./routes/_routes')
const plugins = require('./plugins')
const {jwtStrategy} = require('./auth/strategies')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(plugins);

    server.auth.strategy('jwt','jwt',jwtStrategy);
    server.auth.default('jwt');

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();