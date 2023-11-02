const express = require("express");
const router = express.Router();
const path = require('path');
const [authorize,admin_authorize] = require('../../middleware/authorize.js');

router.get("/",admin_authorize,async (req,res) => {
   const payload = {
      name: req.session.name,
      role: req.session.role,
      ueis_id: req.session.id,
      nid: req.session.nid,
      phone: req.session.phone,
      sex: req.session.sex,
      dob: req.session.dob,
      status: req.session.status
   }

   let {name, role, ueis_id, nid, phone, sex, dob, status} = payload
   const {countService, getAllServices} = require("../../controllers/serviceController.js")
   const {countIdentities} = require("../../controllers/digital_identitiesController.js")
   const {countThirdParties, getAllThirdParties} = require("../../controllers/third_partiesController.js")
   let services = await getAllServices()
   let services_count = await countService()
   let third_count = await countThirdParties()
   let users_count = await countIdentities()
   let thirds = await getAllThirdParties()

   res.render('user_admin',{layout: 'admin_layout',name,role,phone,services,services_count,third_count,users_count,thirds});
})

router.get('/card_reg',(req,res) => {
   res.render('card_reg',{layout:false})
})

router.get('/thirdparty',admin_authorize, async(req,res) => {
   const payload = {
      name: req.session.name,
      role: req.session.role,
      ueis_id: req.session.id,
      nid: req.session.nid,
      phone: req.session.phone,
      sex: req.session.sex,
      dob: req.session.dob,
      status: req.session.status
   }

   let {name, role, ueis_id, nid, phone, sex, dob, status} = payload
   const {getAllThirdParties} = require("../../controllers/third_partiesController.js")
   let thirdparties = await getAllThirdParties()

   res.render('thirdparty',{layout:'admin_layout',name,role,ueis_id,thirdparties})
})

router.get('/users',admin_authorize, async(req,res) => {
   const payload = {
      name: req.session.name,
      role: req.session.role,
      ueis_id: req.session.id,
      nid: req.session.nid,
      phone: req.session.phone,
      sex: req.session.sex,
      dob: req.session.dob,
      status: req.session.status
   }

   let {name, role, ueis_id, nid, phone, sex, dob, status} = payload
   const {getAllIdentities} = require("../../controllers/digital_identitiesController.js")
   let users = await getAllIdentities()
   res.render('users',{layout:'admin_layout',name,role,ueis_id,users})
})

router.get('/card_info',admin_authorize, async(req,res) => {
   const payload = {
      name: req.session.name,
      role: req.session.role,
      ueis_id: req.session.id,
      nid: req.session.nid,
      phone: req.session.phone,
      sex: req.session.sex,
      dob: req.session.dob,
      status: req.session.status
   }

   let {name, role, ueis_id, nid, phone, sex, dob, status} = payload
   const {getAllCards} = require("../../controllers/cardController.js")
   let cards = await getAllCards()
   res.render('card_info',{layout:'admin_layout',name,role,ueis_id,cards})
})

router.get('/cards_table', async(req,res) => {
   const {getAllCards} = require("../../controllers/cardController.js")
   let cards = await getAllCards()
   res.status(200).json(cards)
})

router.get('/services_table', async(req,res) => {
   const {getAllServices} = require("../../controllers/serviceController.js")
   let services = await getAllServices()
   res.status(200).json(services)
})

router.get('/thirdparties_table', async(req,res) => {
   const {getAllThirdParties} = require("../../controllers/third_partiesController.js")
   let third_parties = await getAllThirdParties()
   res.status(200).json(third_parties)
})

router.get('/users_table', async(req,res) => {
   const {getAllIdentities} = require("../../controllers/digital_identitiesController.js")
   let users = await getAllIdentities()
   res.status(200).json(users)
})
module.exports = router;
