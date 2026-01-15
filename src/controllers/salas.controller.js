const pool = require("../config/db");

/* Salas por sucursal */
exports.getBySucursal = async (req, res) => {
  try {
    const { id_sucursal } = req.params;

    const result = await pool.query(`
      SELECT id_sala, nombre, capacidad
      FROM sala
      WHERE id_sucursal = $1
      ORDER BY nombre
    `, [id_sucursal]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener salas" });
  }
};
