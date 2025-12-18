require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const moviesRoutes = require("./routes/movies.routes");
const purchasesRoutes = require("./routes/purchases.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/purchases", purchasesRoutes);

app.get("/", (req, res) => {
  res.send("🎬 Cinema PHOVL API funcionando");
});

module.exports = app;
