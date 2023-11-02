class third_partiesController
{
    static createThirdParty = async (req,res) => {
        try {
            const thirds = require("../models/third_parties")

            const third = await thirds.create({
                company_id: req.body.company_id,
                name: req.body.name,
                description: req.body.description,
                email: req.body.email,
                phone: req.body.phone,
                Location: req.body.location,
                status: req.body.status
            })

            if (!third) throw new Error("Failed to create third party");

            return res.status(201).json({message: 'created', status: 201});

        } catch (error) {
            console.log(error)
            return res.status(400).json({error: error.message, status: 400});
        }
    }

    static findThirdParty = async (id) => {
        try {
            const third_parties = require("../models/third_parties")

            const third_party = await third_parties.findOne({where:{id}})

            if (!third_party) throw new Error("service does not exists");

            return third_party;

        } catch (error) {

            return {error: error.message}
        }
    }

    static getAllThirdParties = async () => {
        try {
            const db = require("../controllers/dbController")
            const Sequelize = require('sequelize')

            const third_party = await db.query(`SELECT * FROM third_parties;`,{type: Sequelize.QueryTypes.SELECT})

            if (!third_party) throw new Error("third party does not exists");

            console.log(third_party)
            return third_party;

        } catch (error) {
            console.log(error.message)
            return {error:error.message}
        }
    }

    static countThirdParties = async () => {
        try {
            const third_parties = require("../models/third_parties")

            const third_party = await third_parties.count()

            if (!third_party) throw new Error("third party does not exists");

            return third_party;

        } catch (error) {

            return 0;
        }
    }

    static updateStatus = async (req,res) => {
        try {
            const thirds = require("../models/third_parties")

            const third = await thirds.update({status: req.body.status},{where:{company_id: req.body.company_id}})

            if (!third) throw new Error("Failed to update third party");

            return res.status(200).json({message: 'third party updated'});

        } catch (error) {

            return res.status(400).json({error: error.message});
        }
    }
}

module.exports = third_partiesController
