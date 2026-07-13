const express = require("express")
const upload = require("../Middleware/Mutler")
const { Base, Main, FirstTake, Second, Third, Final, Getprofile, Firstupdate, Delete, Visible } = require("../Controllers/dashboardController")

const router = express.Router()

router.get("/", Base)
router.get("/main", Main)
router.post("/create/basic", FirstTake)
router.patch("/second", upload.single("image"), Second);
router.patch("/third", Third)
router.patch("/final", Final)
router.patch("/update/basic", Firstupdate)
router.patch("/visible", Visible)
router.delete("/delete", Delete)
router.post("/show", Getprofile)

module.exports = router