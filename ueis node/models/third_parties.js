const Sequelize = require('sequelize')
const db = require('../controllers/dbController')


const third_parties = db.define('third_parties', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name:{type: Sequelize.STRING,allowNull: false},

    company_id:{type: Sequelize.STRING,allowNull: false},

    description:{type: Sequelize.STRING,allowNull: false},

    email:{type: Sequelize.STRING,allowNull: false},

    phone:{type: Sequelize.STRING,allowNull: false},

    Location:{type: Sequelize.STRING,allowNull: false},

    status:{
        type: Sequelize.ENUM(['active','inactive','blocked']),
        defaultValue: 'active',
        allowNull: false
    },

    registered_on:{type: Sequelize.DATE}

})

module.exports = third_parties;
