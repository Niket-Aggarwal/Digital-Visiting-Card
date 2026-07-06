const express = require("express")

const { Base, GoogleLogin, ActiveSession, Verify, Register, ForgetPassword, OtpVerfiy, PasswordReset, Delete } = require("../Controllers/authController")

const router = express.Router()

router.get("/", Base)
router.post("/google", GoogleLogin)
router.get("/me", ActiveSession)
router.post("/verify", Verify)
router.post("/register", Register)
router.post("/forget", ForgetPassword)
router.post("/otpverify", OtpVerfiy)
router.patch("/passupdate", PasswordReset)
router.delete("/delete", Delete)

module.exports = router