const router = require("express").Router();
const controller = require("../controllers/purchases.controller");
const auth = require("../middleware/auth.middleware");

router.post("/", controller.createPurchase);
router.get("/history", auth, controller.history);

module.exports = router;
