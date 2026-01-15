const router = require("express").Router();
const controller = require("../controllers/salas.controller");

router.get("/sucursal/:id_sucursal", controller.getBySucursal);

module.exports = router;
