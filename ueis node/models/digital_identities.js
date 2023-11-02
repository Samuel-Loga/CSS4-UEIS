const Sequelize = require('sequelize')
const db = require('../controllers/dbController')

const digital_identities = db.define('digital_identities',{
    ueis_id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    nid:{type: Sequelize.STRING,allowNull: true},

    permit_number:{type: Sequelize.STRING,allowNull: true},

    passport_number:{type: Sequelize.STRING,allowNull: true},

    email:{type: Sequelize.STRING,allowNull: true},

    fingerprint_id:{type: Sequelize.INTEGER,allowNull: true},

    role:{
        type: Sequelize.ENUM(['user','admin']),
        allowNull: false,
        defaultValue: 'user'
    },
    status:{
        type: Sequelize.ENUM(['active','blocked','inactive']),
        allowNull: false,
        defaultValue: 'active'
    }

});

module.exports = digital_identities;
