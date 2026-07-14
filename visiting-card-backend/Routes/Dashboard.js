const express = require("express")
const upload = require("../Middleware/Mutler")
const { Base, Main, First, Second, Third, Final, Getprofile, Delete, Visible } = require("../Controllers/dashboardController")

const router = express.Router()

router.get("/", Base)
router.get("/main", Main)
router.post("/first", First)
router.patch("/second", upload.single("image"), Second);
router.patch("/third", Third)
router.patch("/final", Final)
router.patch("/visible", Visible)
router.delete("/delete", Delete)
router.post("/show", Getprofile)

module.exports = router