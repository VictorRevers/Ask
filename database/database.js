const Sequelize = require('sequelize');

const connection = new Sequelize('ask', 'root', 'senhadb', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;