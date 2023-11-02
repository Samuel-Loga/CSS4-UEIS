const authorize = async (req,res,next) => {
    try {
        // JWT Token verification function

        const jwt = require('jsonwebtoken');
        const fs = require('fs')
        const path = require('path');

        const publickey = fs.readFileSync(path.join(__dirname+'../../keys/public.key')).toString();
        const token = req.session.token

        jwt.verify(token,publickey,{algorithm: 'RS256'},(err,decoded) =>{

            if (err) res.status(400).render('error',{layout: false,status:400,error:err.message})

            next()
        });

    } catch (error) {
        res.status(400).render('error',{layout: false,status:400,error:error.message})
    }
}
const admin_authorize = async (req,res,next) => {
    try {
        // JWT Token verification function

        const jwt = require('jsonwebtoken');
        const fs = require('fs')
        const path = require('path');

        const publickey = fs.readFileSync(path.join(__dirname+'../../keys/public.key')).toString();
        const token = req.session.token
        const role = req.session.role

        jwt.verify(token,publickey,{algorithm: 'RS256'},(err,decoded) =>{

            if (err) res.status(400).render('error',{layout: false,status:400,error:err.message})

            if (role == 'user') res.status(400).render('error',{layout: false,status:400,error:'admin required!'})

            next()
        });

    } catch (error) {
        res.status(400).render('error',{layout: false,status:400,error:error.message})
    }
}

module.exports = [authorize,admin_authorize]
