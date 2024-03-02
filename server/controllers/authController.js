const User = require("../models/User")
const nodemailer = require('nodemailer')
require('dotenv').config()

const mailSender = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
     user: 'aufnganje002@gmail.com',
     pass: process.env.KEY,
    },
})

const signup = async (req, res) => {
    try {
        const {phone, email} = req.body;
        const existingUser = await User.findOne({phone})
        if (existingUser) {
            res.status(400).json({
                status: 'fail',
                msg: 'Phone number already exists!'
            })
            return;
        }

        const authenticationNumber = Math.floor(1000 + Math.random() * 900)

        const mailOptions = {
            from: 'aufnganje002@gmail.com',
            to: email,
            subject: 'Your one time authentication code',
            text: `Your authentication number is: ${authenticationNumber}`,
        };

        await mailSender.sendMail(mailOptions);

        const user = await User.create({
                            ...req.body, authenticationNumber}
                            ) 
        res.status(201).json({
                                status:'success', 
                                msg: `User created. Please check your email for authentication number.`,
                                data: user})
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: `${error}`
        })
    }
}

const login = async (req, res) => {
    
    try {
        const {id, email, authenticationNumber} = req.body
        let user;
        if(email) {
            user = await User.findOne({email, authenticationNumber})
        } else if(phone) {
            user = await User.findOne({id, authenticationNumber})
        } else {
            res.status(404).json({
                status: 'fail',
                msg: 'Please provide a valid phone number or email'
            })
            return;
        }
        
        if(!user) {
            res.status(401).json({
                status: 'fail',
                msg: 'Invalid phone number or email, or authentication number',
            });
            return;
        }
            res.status(200).json({
                status: 'success',
                msg: user
            })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: `${error}`
        })
    }
}

const updateUser = async (req,res) => {
    const _id = req.params.id
    try {
        const newUser = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({
            status: 'success',
            bool: true,
            msg: newUser
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: `${error}`
        })
    }
}

const deleteUser = async (req,res) => {
    const _id = req.params.id;
    try {
        await User.findByIdAndDelete(_id)
        res.status(200).json({
            status: 'success',
            msg: "Deletion successfully done"
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            msg: error
        })
    }
}

module.exports = {
    login, signup, updateUser, deleteUser
}