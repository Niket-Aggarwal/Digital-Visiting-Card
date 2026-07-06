const express = require("express")
const upload = require("../Middleware/Mutler")
const { Base, Main, FirstTake, Getprofile, Delete, Firstupdate, Second } = require("../Controllers/dashboardController")

const router = express.Router()

router.get("/", Base)
router.get("/main", Main)
router.post("/create/basic", FirstTake)
router.patch("/second", upload.single("image"), Second);
// router.post("/create/third", ThirdTake)
// router.post("/create/final", FinalTake)
router.patch("/update/basic", Firstupdate)
// router.patch("/create/third", Thirdupdate)
// router.patch("/update/final", Finalupdate)
router.delete("/delete", Delete)
router.post("/show", Getprofile)

module.exports = router