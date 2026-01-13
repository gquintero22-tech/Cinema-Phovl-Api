require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/peliculas", require("./routes/peliculas.routes"));
app.use("/api/sucursales", require("./routes/sucursales.routes"));
app.use("/api/funciones", require("./routes/funciones.routes"));
app.use("/api/tickets", require("./routes/tickets.routes"));

module.exports = app;
