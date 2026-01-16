const pool = require("../config/db");

exports.getByMovieSucursalFecha = async (req, res) => {
  try {
    const { id_pelicula, id_sucursal, fecha } = req.params;

    const result = await pool.query(`
      SELECT 
        f.id_funcion,
        f.id_sala,
        f.hora_inicio,
        f.idioma,
        s.nombre AS sala
      FROM funcion f
      JOIN sala s ON f.id_sala = s.id_sala
      WHERE f.id_pelicula = $1
        AND s.id_sucursal = $2
        AND f.fecha = $3
      ORDER BY f.hora_inicio
    `, [id_pelicula, id_sucursal, fecha]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener funciones" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM pelicula WHERE id_pelicula = $1",
      [id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Película no encontrada" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener película" });
  }
};
