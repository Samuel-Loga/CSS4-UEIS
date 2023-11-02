const Sequelize = require("sequelize")
const host = "localhost"
const db = "ueis"
const user = "root"
const password = "password123"

module.exports = new Sequelize(db,user,password,
    {
        host,
        dialect: 'mysql',
        pool:{
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define:{
            timestamps: false
        }
}) ;
