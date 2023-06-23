const nodemailer = require("nodemailer")
require('dotenv').config()
const userController = require('./userController')

async function send(email,subject,text) {

    id = userController.getIdfromEmail(email)
    
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text:`${process.env.VERIFY_URL}/${text}`
        })
        console.log('Email sent successfully!')
        
    }catch(err) {
        console.log('Email not sent :(')
        console.log(err.message)
    }
}

module.exports = {send}