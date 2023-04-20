const todos = [
    { id: 1, title: 'title1', description: 'This is todo no 1', createdBy: 1, createdAt:'2023-04-16 17:00:00' },
    { id: 2, title: 'title2', description: 'This is todo no 2', createdBy: 2, createdAt:'2023-04-17 17:51:00' },
];

const findAll = () => todos;

module.exports = {findAll};