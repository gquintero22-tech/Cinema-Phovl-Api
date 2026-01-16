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
    const { id_funcion } = req.params;
    const result = await pool.query(`
      SELECT f.id_funcion, f.id_sala, f.hora_inicio, f.idioma, f.fecha, f.id_pelicula, s.nombre AS sala, s.id_sucursal
      FROM funcion f
      JOIN sala s ON f.id_sala = s.id_sala
      WHERE f.id_funcion = $1
    `, [id_funcion]);

    if (result.rows.length === 0) return res.status(404).json({ error: "Función no encontrada" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener función" });
  }
};
