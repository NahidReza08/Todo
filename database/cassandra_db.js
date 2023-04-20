let cassandra = require('cassandra-driver');
require('dotenv').config();
const connectDb = () => {
    let authProvider = new cassandra.auth.PlainTextAuthProvider(process.env.DB_USERNAME, process.env.DB_PASSWORD);
    let contactPoints = ['localhost'];
    let localDataCenter = process.env.DB_DATACENTER;
    let keyspace = process.env.DB_KEYSPACE

    let client = new cassandra.Client({contactPoints, authProvider, localDataCenter, keyspace});
    return client
}



const executeQuery = async (query, params, client) => {
    let response = {}
    await client.execute(query, params, { prepare: true })
        .then(result =>  response = {execution:true, data: result.rows})
        .catch(err => response = {execution:false, error: err});
    return response;
}

const executeTBatchQuery = async (listOfQueryObj,client) => {
    let response = {}
    await client.batch(listOfQueryObj, { prepare: true })
        .then(result => response = {execution:true, data: result.rows})
        .catch(err => response = {execution:false, error:err})
    return response;
}

const closeDb = client => client.shutdown();

module.exports = {connectDb, executeQuery, closeDb, executeTBatchQuery}