const Sequelize = require('sequelize')

const DB_NAME = 'u938043059_dbnodejstodo'
const USER_NAME = 'u938043059_rootdbtodo'
const PASSWORD = '939l30(64?R7JpkRI=D)WBkx}?*SS@rvmnZiQ9EX&()i_hhaPqgkueBPjU-Qeax?'
const OPTIONS = {
    host: '153.92.6.85',
    dialect: 'mysql'
}

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, OPTIONS)

module.exports = sequelize