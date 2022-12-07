const express = require("express");
const router = express.Router();

const { getRequest, postRequest, updateRequest, deleteRequest } = require("../controllers/goalControls");

router.route("/").get(getRequest).post(postRequest)

router.route("/:id").put(updateRequest).delete(deleteRequest)

module.exports  = router