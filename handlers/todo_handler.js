const {findAll} = require('../constants/todos')
const getTodos = (request, h) => {
    return findAll();
}

module.exports = {getTodos}