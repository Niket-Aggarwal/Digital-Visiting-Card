const express = require("express")

const { Base, Main, FirstTake, Getprofile, Delete, Firstupdate } = require("../Controllers/dashboardController")

const router = express.Router()

router.get("/", Base)
router.get("/main", Main)
router.post("/create/basic", FirstTake)
// router.post("/create/second", SecondTake)
// router.post("/create/third", ThirdTake)
// router.post("/create/final", FinalTake)
router.patch("/update/basic", Firstupdate)
// router.patch("/update/second", Secondupdate)
// router.patch("/create/third", Thirdupdate)
// router.patch("/update/final", Finalupdate)
router.delete("/delete", Delete)
router.post("/show", Getprofile)

module.exports = router