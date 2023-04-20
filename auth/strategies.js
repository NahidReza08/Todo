const {validate} = require("./jwt");
require('dotenv').config();

const jwtStrategy = {
    key: process.env.JWT_SECRET,
    validate: validate,
    verifyOptions: { algorithms: ['HS256'] },
}

module.exports = {jwtStrategy}