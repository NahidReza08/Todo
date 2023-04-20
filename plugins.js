const plugins = [
    { plugin: require('hapi-auth-jwt2') },
    { plugin: require('hapi-authorization') },
]

module.exports = plugins;