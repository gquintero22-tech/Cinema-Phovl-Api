const express = require("express");
const router = express.Router();
const asientoController = require("../controllers/asiento.controller");

router.get("/salas/:id_sala/asientos", asientoController.getBySala);
router.get("/funciones/:id_funcion/asientos-ocupados", asientoController.getOcupadosByFuncion);

module.exports = router;
