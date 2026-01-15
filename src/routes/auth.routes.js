const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const asientoRoutes = require("./routes/asiento.routes");

router.post("/register", controller.register);
router.post("/login", controller.login);

app.use("/api", asientoRoutes);
module.exports = router;
