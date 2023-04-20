const users = [
    { id: 1, email: 'user1@example.com', username: 'user1', password: '$2b$10$L02KoH2ivIbPAcCQ3osmkeEp4y.J5dI7dn3iZEQD7bLqUV.lf9o9W', scope: ['admin'] }, //'password1'
    { id: 2, email: 'user2@example.com', username: 'user2', password: '$2b$10$Ljq8pbRnMxHQUZWoxXSeY.G/qUK/PkZhk/uKu698F7GBPvU81rOJa', scope: ['user'] }, //'password2'
];

const findByUserId = id => users.find(user => user.id == id)
const findByUsername = username => users.find(user => user.username == username)

module.exports = {findByUserId, findByUsername};