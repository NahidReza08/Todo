const TodoHandler = require('../handlers/todo_handler')

const todoRoutes = [
    {
        method: 'GET', path: '/todos', options: {auth: {strategy: 'jwt', scope:'admin'} },
        handler: TodoHandler.getTodos
    },
];

module.exports = todoRoutes;