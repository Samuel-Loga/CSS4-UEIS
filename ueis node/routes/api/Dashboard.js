const express = require("express");
const router = express.Router();
const path = require('path');
const [authorize,admin_authorize] = require('../../middleware/authorize.js')
const {findUser, findIdentity} = require('../../controllers/digital_identitiesController.js')

router.get("/",authorize, async (req,res) => {

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

   res.render('user_dash', {name,role,ueis_id});
})

router.get("/user_profile",authorize,(req,res) => {

   const payload = {
      name: req.session.name,
      role: req.session.role,
      ueis_id: req.session.ueis_id,
      nid: req.session.nid,
      phone: req.session.phone,
      sex: req.session.sex,
      dob: req.session.dob,
      status: req.session.status
   }

   let {name, role, ueis_id, nid, phone, sex, dob, status} = payload

   res.render('user_profile',{name,role,ueis_id,nid,phone,sex,dob,status});
})

router.get("/help",authorize,(req,res) => {
   const payload = {
      name: req.session.name,
      role: req.session.role,
      ueis_id: req.session.ueis_id,
      nid: req.session.nid,
      phone: req.session.phone,
      sex: req.session.sex,
      dob: req.session.dob,
      status: req.session.status
   }

   let {name, role, ueis_id, nid, phone, sex, dob, status} = payload
   res.render('help',{name,role,ueis_id});
})

router.get("/about",authorize,(req,res) => {
   const payload = {
      name: req.session.name,
      role: req.session.role,
      ueis_id: req.session.ueis_id,
      nid: req.session.nid,
      phone: req.session.phone,
      sex: req.session.sex,
      dob: req.session.dob,
      status: req.session.status
   }

   let {name, role, ueis_id, nid, phone, sex, dob, status} = payload
   res.render('about',{name,role,ueis_id});
})

router.get("/contact",authorize,(req,res) => {
   const payload = {
      name: req.session.name,
      role: req.session.role,
      ueis_id: req.session.ueis_id,
      nid: req.session.nid,
      phone: req.session.phone,
      sex: req.session.sex,
      dob: req.session.dob,
      status: req.session.status
   }

   let {name, role, ueis_id, nid, phone, sex, dob, status} = payload
   res.render('contact',{name,role,ueis_id});
})

module.exports = router;
