const Sequelize = require('sequelize');
const connection = require('./database');

//define model
const Ask = connection.define('questions',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//create table
Ask.sync({force: false}).then(()=>{});

module.exports = Ask;