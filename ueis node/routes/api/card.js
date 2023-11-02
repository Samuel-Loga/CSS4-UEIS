const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cardcontroller = require('../../controllers/cardController');
const [authorize,admin_authorize] = require("../../middleware/authorize");
const {findUser, findIdentity} = require('../../controllers/digital_identitiesController.js')

router.post('/auth', async (req,res) => {
    try {
            var card = req.body.card;

            const privatekey = fs.readFileSync(path.join(__dirname+'../../../keys/private.key')).toString();

            // check for the validity of card no
            const [id,input] = card.split(":")

            //const card_ids = id.split("Time")
            //console.log(card_ids)
            const card_id = await cardcontroller.authenticate(id);

            if(card_id == 0) throw new Error('Invalid card');

            // verifying the card of the data
            var [ueis_id,error] = input.split("T")
            let uid = ueis_id
            const card_ueis = await cardcontroller.retrive(ueis_id);

            if(id != card_ueis) throw new Error('Fake card');

            jwt.sign(ueis_id,privatekey,{algorithm:'RS256',allowInsecureKeySizes:true}, async (err,token) => {

                if(err) throw new Error(err.message)

                req.session.token = token

                const users = require('../../models/citizens')

                const identity = await findUser(uid)

                const user = await users.findOne({where:{nid: identity.nid}})

                let {role, status, ueis_id, fingerprint_id} = identity

                let {firstname, othername, surname,nid, phone, sex, dob} = user

                req.session.name = `${firstname} ${surname}`
                req.session.role = `${role}`
                req.session.ueis_id = `${ueis_id}`
                req.session.nid = `${nid}`
                req.session.phone = `${phone}`
                req.session.sex = `${sex}`
                req.session.dob = `${dob}`
                req.session.status = `${status}`
                req.session.fid = `${fingerprint_id}`

                return res.status(201).redirect('/Auth/fingerprint')
            })


    } catch (error) {

        return res.status(400).render('error',{layout: false,status:400,error:error.message})
    }




})

router.post('/write',async (req,res) => {
    try {
        const nid = req.body.nid;
        const {findIdentity} = require("../../controllers/digital_identitiesController")
        const identity = await findIdentity(nid);
        const ueis_id = identity.ueis_id

       // if(!ueis_id) throw new Error("user not registered!")

        var data = ueis_id + ">";

        return res.status(201).json({data})

    } catch (error) {
        return res.status(400).render('error',{layout: false,status:400,error:error.message})
    }

})

router.post('/register', async (req,res) => {
    try {
       const payload = req.body.payload
       const [cid,ueis_id] = payload.split(":")

        // verifying the card of the data
        cardcontroller.register(cid,ueis_id)

        return res.status(201).json({message:"registered card"})

    } catch (error) {

        return res.status(400).render('error',{layout: false,status:400,error:error.message})
    }
})

router.post('/update',admin_authorize, async (req,res) => {
    try {
        const status = req.body.status
        const card_id = req.body.card_id

        cardcontroller.updateStatus(status,card_id)

        res.status(200).json({message:"card updated"})

    } catch (error) {

        return res.status(400).render('error',{layout: false,status:400,error:error.message})
    }
})
module.exports = router;
