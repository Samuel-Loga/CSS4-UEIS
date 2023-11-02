const Sequelize = require('sequelize')
const db = require('../controllers/nrbcontroller')

const noncitizens = db.define('noncitizens', {
    permit_no: {
        type: Sequelize.STRING,
        primaryKey: true
    },

    firstname: {type: Sequelize.STRING},

    othername: {type: Sequelize.STRING},

    surname: {type: Sequelize.STRING},

    sex: {type: Sequelize.ENUM(['male','female'])},

    phone: {type: Sequelize.STRING},

    dob: {type: Sequelize.DATE},

})

module.exports = noncitizens;
