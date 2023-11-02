const { Sequelize } = require("sequelize");
const digital_identities = require("../models/digital_identities");


class cardController
{
    static authenticate = async (card_id) => {
        try {

            const cards = require("../models/cards")

            const card = await cards.findAll({where:{card_id}})

            if (!card) throw new Error("card does not exists");

            return true;

        } catch (error) {

            return error.message;
        }
    }

    static getAllCards = async () => {
        try {
            const db = require("../controllers/dbController")

            const card = await db.query("SELECT `cards`.`id`,`cards`.`status`, `cards`.`card_id`,`nid`, `cards`.`registered_on`, `digital_identity`.`ueis_id` FROM `cards` AS `cards` INNER JOIN `digital_identities` AS `digital_identity` ON cards.ueis_id = digital_identity.ueis_id;",{type: Sequelize.QueryTypes.SELECT})

            if (!card) throw new Error("card does not exists");

            return card

        } catch (error) {
            console.log(error.message)
            return {error: error.message}
        }
    }

    static updateStatus = async (status,card_id) => {
        try {
            const cards = require("../models/cards")

            const card = await cards.update({status},{where:{card_id}})

            if (!card) throw new Error("card failed to update");

            return card

        } catch (error) {
            console.log(error.message)
            return {error: error.message}
        }
    }

    static retrive = async (ueis_id) => {
        try {

            const cards = require("../models/cards")

            const card = await cards.findOne({where:{ueis_id}})

            if (!card) throw new Error("card does not exists");

            return card.card_id;

        } catch (error) {

            return error.message;
        }
    }

    static register = async (card_id,ueis_id) => {
        try {
            const cards = require("../models/cards")
            const card = await cards.create({card_id,ueis_id:ueis_id.trim()})

            if (!card) throw new Error("Failed to register card");


        } catch (error) {

            console.log(error.message)
            return error.message;
        }

    }
}

module.exports = cardController;
