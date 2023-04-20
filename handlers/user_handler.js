const {generateToken} = require("../auth/jwt");
const userService = require("../services/user_service")
let db = require('../database/cassandra_db')
const bcrypt = require("bcrypt");
const signup = async (request, h) => {
    const {username, email, password, name} = request.payload
    const hashedPassword = await bcrypt.hash(password, 10);
    let client = db.connectDb();
    let response = await userService.addUserWithProfile(username,email,hashedPassword,name,client);
    db.closeDb(client);
    return response;
}

const login = async (request, h) => {
    const {username, password} = request.payload;

    let client = db.connectDb();
    const response = await userService.findUserByUsername(username, client)
    db.closeDb(client);

    if(!response.execution) return response;
    let user = response.data[0];

    if (user && await bcrypt.compare(password, user.password) && user['is_active'])
        return { execution: true, token: generateToken({id: user.id, username: user.username}) }
    return { execution: false, error: { message: 'Authentication Failure'} };
}

const deleteAccount = async (request, h) => {
    const {id} = request.query;
    let client = db.connectDb();
    let response = await userService.deleteUserWithProfile(id,client);
    db.closeDb(client);
    return response;
}

module.exports = {login, signup, deleteAccount}