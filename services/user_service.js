let { types: { TimeUuid } } = require("cassandra-driver")
let db = require('../database/cassandra_db')
const addUserWithProfile = async (username, email, password, name, client) => {
    let id = TimeUuid.now().toString();
    let timestamp = new Date().toISOString();

    let userQuery = `INSERT INTO user_by_id (id,username,email,password,scope,is_active,created_at) 
                        VALUES (?,?,?,?,'user',true,?)`
    let userParams = [id, username, email, password, timestamp]
    let profileQuery = `INSERT INTO profile_by_user_id (user_id,name,created_at,updated_at) 
                        VALUES (?,?,?,?)`
    let profileParams = [id, name, timestamp, timestamp]

    let queryList = [{query:userQuery,params:userParams}, {query: profileQuery, params: profileParams}]
    return await db.executeTBatchQuery(queryList, client)
}

const deleteUserWithProfile = async (id, client) => {
    let userQuery = `DELETE FROM user_by_id WHERE id = ?`
    let profileQuery = `DELETE FROM profile_by_user_id WHERE user_id = ?`

    let queryList = [{query:userQuery,params:[id]}, {query: profileQuery, params: [id]}]
    return await db.executeTBatchQuery(queryList, client)
}

const findUserByUsername = async (username, client) => {
    let userQuery = `SELECT * FROM user_by_username WHERE username = ?`
    return await db.executeQuery(userQuery,[username],client);
}

const findUserByUseId = async (id, client) => {
    let userQuery = `SELECT * FROM user_by_id WHERE id = ?`
    return await db.executeQuery(userQuery,[id],client);
}

module.exports = {addUserWithProfile, deleteUserWithProfile, findUserByUsername, findUserByUseId}
