const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("All fields are mandantory!!");
        }
        const userAvailable = await User.findOne({ email });
        if (userAvailable) {
            res.status(400);
            throw new Error('User already registerd');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        if (user) {
            res.status(201).json({
                _id: user.id,
                email: user.email
            })
        }
        else {
            res.status(400);
            throw new Error('User Data is not valid')
        }
    } catch (err) {
        next(err);
    }
}
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error("All fields are mandantory!!");
        }
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            }, process.env.ACCESS_TOKEN_SECRET,
               {expiresIn:"1m"} 
            )
            res.status(200).json({
               accessToken
            })

        }
        else{
            res.status(401);
            throw new Error("Users Credentials Invalid");
        }

    } catch (err) {
        next(err);
    }
}
const currentUser = async (req, res) => {
    res.json({ message: " Current User" })
}

module.exports = { registerUser, currentUser, loginUser };