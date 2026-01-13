const pool = require("../config/db");

exports.getByMovie = async (req, res) => {
  const { id_pelicula } = req.params;

  const result = await pool.query(`
    SELECT f.*, s.nombre AS sala
    FROM funcion f
    JOIN sala s ON f.id_sala = s.id_sala
    WHERE id_pelicula = $1
  `, [id_pelicula]);

  res.json(result.rows);
};
