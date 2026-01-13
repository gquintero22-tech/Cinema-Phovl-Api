const router = require("express").Router();
const controller = require("../controllers/tickets.controller");

router.post("/comprar", controller.comprar);

module.exports = router;
