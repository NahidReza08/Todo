const jwt = require('jsonwebtoken')
const {findUserByUseId} = require("../services/user_service");
const db = require("../database/cassandra_db");
require('dotenv').config();

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '1h' });
};

const validate = async (decoded) => {
    let client = db.connectDb();
    const response = await findUserByUseId(decoded.id, client);
    db.closeDb(client);

    let user = response.data[0];
    if (!response.execution || !user || user.username !== decoded.username || !user['is_active']) return { isValid: false };
    return { isValid: true, credentials: { userId: user.id, scope:user.scope } };
};

module.exports = {generateToken,validate}
