const pool = require("../config/db");

exports.getAll = async (req, res) => {
  const result = await pool.query("SELECT * FROM pelicula");
  res.json(result.rows);
};
