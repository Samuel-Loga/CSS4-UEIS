const Sequelize = require('sequelize')
const db = require('../controllers/nrbController')

const citizens = db.define('citizens', {
    nid: {
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

module.exports = citizens;
