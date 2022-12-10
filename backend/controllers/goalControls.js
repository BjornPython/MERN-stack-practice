const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// FOR GET REQUESTS
const getGoals = asyncHandler(async (req, res) => {

    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

// FOR POST REQUESTS
const postGoal = asyncHandler(async (req, res) => {

    const response = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(response)
})

// FOR PUT REQUESTS
const updateGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        throw new Error("Goal not found!")
    }


    const user = await User.findById(req.user.id)

    if (!user) {
        throw new Error("User not found!")
    }

    if (goal.user.toString() !== user.id) {
        throw new Error("You do not have permission to edit this goal.")
    }

    const newGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(newGoal)
})


// FOR DELETE REQUESTS
const deleteGoal = asyncHandler(async (req, res) => {

    if (!req.params.id) {
        throw new Error("Please provide the ID")
    }

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        throw new Error("Goal not found!")
    }

    console.log("REQ USER ID: ", req.user.id);
    const user = await User.findById(req.user.id)
    console.log("USER: ", user);
    if (!user) {
        throw new Error("User not found!")
    }

    if (goal.user.toString() !== user.id) {
        throw new Error("You do not have permission to edit this goal.")
    }
    console.log("REQ PARAMS ID:", req.params.id);
    const removed = await goal.remove()

    console.log(removed);

    if (removed) {
        res.status(200)
        res.json({message: "Succesfully removed Goal."})
    } else {
        res.status(400)
        res.json({message: "Failed to remove Goal."})
    }

    })


// EXPORTING MODULES
module.exports = {
    getGoals,
    postGoal,
    updateGoal,
    deleteGoal
}