class emailController
{
    static sendMail = async (req,res) =>{
        try {
            const nodemailer = require('nodemailer');
            const subject = req.body.subject
            const message = req.body.message

            // Create a transporter object with your email service settings
            const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'ueissystem@gmail.com',
                pass: 'czlzzgoatysyoksf'
            }
            });

            // Define the email content
            const mailOptions = {
            from: 'ueissystem@gmail.com',
            to: 'ueissupport@gmail.com',
            subject: subject,
            text: message
            };

            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.render('error',{layout:false,status:400,error:error.message});
            } else {
                console.log('Email sent:', info.response);
            }
            });

        } catch (error) {
            res.render('error',{layout:false,status:400,error:error.message})
        }
    }
}

module.exports = emailController;
