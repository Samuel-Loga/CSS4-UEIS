const Sequelize = require('sequelize')
const db = require('../controllers/dbController')


const otps = db.define('otps', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    code:{type: Sequelize.STRING},

    ueis_id:{type: Sequelize.STRING},

    phone:{type: Sequelize.STRING},

    status:{
        type: Sequelize.ENUM(['valid','invalid']),
        defaultValue: 'valid'
    },

})

module.exports = otps;
