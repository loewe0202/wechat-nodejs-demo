const configs = require('../config.json')

module.exports = require('knex')({
    debug: true,
    client: 'mysql',
    connection: {
        host: configs.mysql.host,
        port: configs.mysql.port || 3306,
        user: configs.mysql.user || 'root',
        password: configs.mysql.pass,
        database: configs.mysql.db,
        charset: configs.mysql.char || 'utf8mb4'
    }
})
