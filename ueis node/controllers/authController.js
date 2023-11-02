class authController
{
   static generateOTP = async (phone,code,ueis_id) => {
        try {
            const accountSid = "AC32c85f39def9c445dc0d4acac663665d";
            const authToken = "a64f0ae9ada6660b6b2282b5b73a103d";
            const client = require('twilio')(accountSid, authToken);

            client.messages.create({
                body: `UEIS: Your code ${code}. Don't share it.`,
                to: `${phone}`,
                from: '+12024172975',
            })

            const otps = require('../models/otps')

            let otp = await otps.create({code,ueis_id,phone})

            if(!otp) throw new Error("Failed to store otp");

            return true;

        } catch (error) {

            console.error(error.message)
        }
   }

   static verifyOTP = async (code,ueis_id) => {
        try {

            const store = require('../models/otps')

            let otps = await store.findAll({where:{ueis_id}})

            if(!otps) throw new Error("Invalid otp");

            for(const otp of otps){
                if(otp.status == 'valid'){
                    if(otp.code == code){
                       otp.update({status: "invalid"},{where:{id: otp.id}})

                       return {valid: true}
                    }
                }
            }

        } catch (error) {

           return {valid: false}
        }
   }

   static generateToken = async (req,res) => {
        try {
            // JWT token generation function

            const jwt = require('jsonwebtoken');
            const fs = require('fs')
            const path = require('path');

            const privateKey = fs.readFileSync(path.join(__dirname+'../../keys/private.key')).toString();

            const payload = {
                nid:'mw1234',
                email:'ex@mail.com',
                user:'john doe',
                role: 'user'
            }

            jwt.sign({data:payload}, privateKey, { algorithm: 'RS256', expiresIn: '1w' },(err,token) => {

                if (err) res.status(400).json({message:err.message})

                res.cookie("token",token,{httpOnly: true,sameSite: 'Lax',secure: true})
                res.cookie("user",payload.user,{sameSite: 'Lax',secure: true})
                res.status(201).json({token})
            });

        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }

    static verifyToken = async (req,res) => {
        try {
            // JWT Token verification function

            const jwt = require('jsonwebtoken');
            const fs = require('fs')
            const path = require('path');

            const publickey = fs.readFileSync(path.join(__dirname+'../../keys/public.key')).toString();
            const token = req.cookies.token

            jwt.verify(token,publickey,{algorithm: 'RS256'},(err,decoded) =>{

                if (err) res.status(400).json({message:err.message})

                res.status(200).json(decoded)
            });

        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }

    static refreshToken = async (req,res) => {
        try {
            // JWT Token refreshing function
            const jwt = require('jsonwebtoken');
            const fs = require('fs')
            const path = require('path');

            const privateKey = fs.readFileSync(path.join(__dirname+'../../keys/private.key')).toString();
            const publickey = fs.readFileSync(path.join(__dirname+'../../keys/public.key')).toString();
            const token = req.cookies.token

            jwt.verify(token,publickey,{algorithm: 'RS256'},(err,decoded) =>{

                if (err) res.status(400).json({message:err.message})

                res.clearCookie(req.cookies.token);

                jwt.sign({data:decoded.data}, privateKey, { algorithm: 'RS256', expiresIn: '1w' },(err,token) => {

                    if (err) res.status(400).json({message:err.message})

                    res.cookie("token",token,{httpOnly: true,sameSite: 'Lax',secure: true})
                    res.status(201).json({token})
                });
            });
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }
}

module.exports = authController;
