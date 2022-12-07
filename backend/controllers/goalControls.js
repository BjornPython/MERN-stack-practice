const asyncHandler = require("express-async-handler");


// FOR GET REQUESTS
const getRequest = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `You requested a ${req.method} from /api/goals${req.url}`
    })
})

// FOR POST REQUESTS
const postRequest = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `You requested a ${req.method} from /api/goals${req.url}`
    })
})

// FOR PUT REQUESTS
const updateRequest = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add a text Field")
    }

    res.status(200).json({
        message: `You requested a ${req.method} from /api/goals/${req.params.id} ${JSON.stringify(req.body)}`
    })
})


// FOR DELETE REQUESTS
const deleteRequest = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `You requested a ${req.method} from /api/goals/${req.params.id} ${req.body}`
    })
})


// EXPORTING MODULES
module.exports = {
    getRequest,
    postRequest,
    updateRequest,
    deleteRequest
}