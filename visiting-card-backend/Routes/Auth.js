const express = require("express")

const { Base, GoogleLogin, ActiveSession, Verify, Register } = require("../Controllers/authController")

const router = express.Router()

router.get("/", Base)
router.post("/google", GoogleLogin)
router.post("/me", ActiveSession)
router.post("/verify", Verify)
router.post("/register", Register)

module.exports = router