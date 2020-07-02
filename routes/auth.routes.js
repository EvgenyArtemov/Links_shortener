const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

//registration
router.post(
    '/register', 
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Incorrect Password').isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect Registration Data'
                })
            }

            const {email, password} = req.body;
            const candidate = await User.findOne({email: email});

            if(candidate) {
                return res.status(400).json({message: 'User already exsists'})
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email: email, password: hashedPassword});

            await user.save();

            res.status(201).json({message: 'User has created'})
        } catch (e) {
            res.status(500).json({message: 'Something went wrong, please try again'})
        }
})


//login
router.post(
    '/login', 
    [
        check('email', 'Please enter correct email adress').normalizeEmail().isEmail(),
        check('password', 'Please enter the password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect Login Data'
                })
            }

            const { email, password} = req.body;

            const user = await User.findOne({ email });

            if(!user){
                return res.status(400).json({message: `User wasn't found`})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({message: 'Incorrect password, please try again'})
            }

            const token = jwt.sign(
                { userID: user.id },
                config.get("jwtSecret"),
                { expiresIn: '1h' }
            )

            res.json({token, userId: user.id})

            
        } catch (e) {
            res.status(500).json({message: 'Something went wrong, please try again'})
        }
})

module.exports = router;