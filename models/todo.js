const Sequelize = require('sequelize')
const database = require('../utils/database')

const todo = database.define('todo', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.BOOLEAN
    },
    done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = todo