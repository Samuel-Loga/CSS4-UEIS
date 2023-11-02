const Sequelize = require('sequelize')
const db = require('../controllers/dbController')


const cards = db.define('cards', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    card_id:{
        type: Sequelize.STRING
    },
    ueis_id:{
        type: Sequelize.STRING
    },
    status:{
        type: Sequelize.ENUM(['active','blocked','stolen','lost']),
        defaultValue: 'active'
    },

})

module.exports = cards;
