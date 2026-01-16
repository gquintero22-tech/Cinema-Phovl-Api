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

