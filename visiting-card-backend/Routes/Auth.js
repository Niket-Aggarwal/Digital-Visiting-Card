const express = require("express")
const router = express.Router()
const { Base, GoogleLogin, ActiveSession, Verify, Register } = require("../Controllers/authController")

router.get("/", Base)
router.post("/google",GoogleLogin)
router.post("/me",ActiveSession)
router.post("/verify",Verify)
router.post("/register",Register)

module.exports = router