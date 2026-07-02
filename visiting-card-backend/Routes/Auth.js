const express = require("express")
const router = express.Router()
const { Base } = require("../Controllers/authController")

router.get("/", Base)

module.exports = router