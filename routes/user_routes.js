const AuthHandler = require("../handlers/user_handler");
const authRoutes = [
    {
        method: 'POST', path: '/signup', options: {auth: false},
        handler: AuthHandler.signup
    },
    {
        method: 'POST', path: '/login', options: {auth: false},
        handler: AuthHandler.login
    },
    {
        method: 'DELETE', path: '/delete/account', options: {auth: false},
        handler: AuthHandler.deleteAccount
    },
];

module.exports = authRoutes;