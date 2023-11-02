class serviceController
{
    static findService = async (id) => {
        try {
            const services = require("../models/digital_identities")

            const service = await services.findOne({where:{id}})

            if (!service) throw new Error("service does not exists");

            return service;

        } catch (error) {

            return {error: error.message}
        }
    }

    static getAllServices = async () => {
        try {
            const db = require("../controllers/dbController")
            const Sequelize = require('sequelize')

            const service = await db.query(`select services.id as id,third_parties.name as third_party, services.name as name, services.category as category, services.description as description,services.status as status,services.registered_on as registered_on
                                            from services
                                            inner join third_parties
                                            on third_parties.id = services.third_party_id;`,{type: Sequelize.QueryTypes.SELECT})

            if (!service) throw new Error("service does not exists");

            return service;

        } catch (error) {

            return {error:error.message}
        }
    }

    static countService = async () => {
        try {
            const services = require("../models/services")

            const service = await services.count()

            if (!service) throw new Error("service does not exists");

            return service;

        } catch (error) {

            return 0;
        }
    }

    static createService = async (req,res) => {
        try {
            const services = require("../models/services")

            const service = await services.create({
                third_party_id: req.body.third_party_id,
                name: req.body.name,
                description: req.body.description,
                category: req.body.category
            })

            if (!service) throw new Error("Failed to create service");

            return res.status(201).json({message: 'created', status: 201});

        } catch (error) {

            return res.status(400).json({error: error.message, status: 400});
        }
    }

    static updateService = async (req,res) => {
        try {
            const services = require("../models/services")

            const service = await services.update({status: req.body.status},{where:{id: req.body.id}})

            if (!service) throw new Error("Failed to update service");

            return res.status(200).json({message: 'service updated'});

        } catch (error) {

            return res.status(400).json({error: error.message, status: 400});
        }
    }
}

module.exports = serviceController
