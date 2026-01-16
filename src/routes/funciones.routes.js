const router = require("express").Router();
const controller = require("../controllers/funciones.controller");

router.get("/:id_pelicula/:id_sucursal/:fecha", controller.getByMovieSucursalFecha);

module.exports = router;
