const authRoutes = require('./user_routes')
const todoRoutes = require('./todo_routes')

const startingRoutes = [
    {
        method: 'GET', path: '/', options: {auth: false},
        handler: async (request, h) => 'Welcome!',
    },
]

const routes = [...startingRoutes, ...authRoutes, ...todoRoutes]

module.exports = routes;