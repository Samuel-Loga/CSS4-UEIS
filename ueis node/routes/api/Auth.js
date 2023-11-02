const express = require("express");
const router = express.Router();
const path = require('path');
const {generateToken, verifyToken, refreshToken, generateOTP} = require('../../controllers/authController')
const {getMaxFid} = require("../../controllers/digital_identitiesController")
const [authorize,admin_authorize] = require('../../middleware/authorize.js')

// Authentication pages

router.get('/register', async (req,res) => {
   let fid = await getMaxFid()

   if (fid == 0) fid = 1
   fid += 1

   res.render('register',{fid,layout:false})
})

router.get('/card',(req,res) => {
   res.render('login',{layout:false})
})

router.get('/fingerprint',authorize,(req,res) => {
   res.render('fingerprint_auth',{layout:false})
})

router.get('/fingerprint_enroll',(req,res) => {
   res.render('fingerprint_enroll',{layout:false})
})

router.get('/login',authorize,(req,res) => {
   try {
      let db_fid = req.session.fid
      let role = req.session.role
      let fid = req.query.fid

      if (db_fid != fid) throw new Error("Could not authenticate user!")

      if(role == 'user') res.redirect('/Dashboard/')

      if(role == 'admin') res.redirect('/Admin/')

   } catch (error) {
      
      res.render('error',{layout:false,status:400,error:error.message})
   }


})

router.get('/reset',(req,res) => {
   res.render('reset',{layout:false})
})

router.get('/reset_password',(req,res) => {
   res.render('reset_password',{layout:false})
})

router.get('/signout',(req,res) => {
   res.clearCookie('ueisAuth')
   req.session.destroy((err) => {
      if (err) res.render('error',{layout:false,status:400,error:err.message})

      res.redirect('/')
   })

})

// Authencation functions
router.post('/OTP', generateOTP)

router.post('/verifyOTP', verifyToken)

router.get('/token', generateToken)

router.post('/verifyToken', verifyToken)

router.post('/refreshToken', refreshToken)

module.exports = router;
