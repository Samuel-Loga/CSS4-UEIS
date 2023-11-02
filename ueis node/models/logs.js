const Sequelize = require('sequelize')
const db = require('../controllers/logController')

const logs = {
    logs: {
        user_id: {type: Sequelize.INTEGER},

        action: {type: Sequelize.STRING},

        description: {type: Sequelize.STRING},
        
        logged_on: {type: Sequelize.DATE},
    }
}

module.exports = logs;
