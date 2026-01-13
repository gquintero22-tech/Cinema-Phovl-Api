const router = require("express").Router();
const controller = require("../controllers/funciones.controller");

router.get("/:id_pelicula", controller.getByMovie);

module.exports = router;
