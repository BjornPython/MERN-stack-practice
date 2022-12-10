const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const {
    json
} = require("express");



const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Please include name email and password Fields.")
    }

    const userExists = await User.findOne({
        email
    })

    if (userExists) {
        res.status(400)
        throw new Error("User email already exists.")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPass
    })

    const userToken = await generateToken(user.id)

    if (user) {
        res.status(201).json({
            // id: user.id, 
            // name, 
            // email, 
            token: userToken
        })
        console.log("SENDING");
    } else {
        throw new Error("Failed to create new user.")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body
    const user = await User.findOne({
        email
    })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            // id: user.id,
            // name: user.name,
            // email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        res.json({
            message: "Invalid User Data."
        })
    }

})

const getUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})


const generateToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_TOKEN, {
        expiresIn: "7d"
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}