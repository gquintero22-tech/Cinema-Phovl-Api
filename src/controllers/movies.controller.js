const pool = require("../config/db");

exports.getMovies = async (req, res) => {
  const { category } = req.query;

  const result = await pool.query(
    "SELECT * FROM movies WHERE category=$1",
    [category]
  );

  res.json(result.rows);
};
