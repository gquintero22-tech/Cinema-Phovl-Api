const pool = require("../config/db");

/* Asientos de una sala */
exports.getBySala = async (req, res) => {
  try {
    const { id_sala } = req.params;

    const result = await pool.query(`
      SELECT id_asiento, fila, numero
      FROM asiento
      WHERE id_sala = $1
      ORDER BY fila, numero
    `, [id_sala]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener asientos" });
  }
};

/* Asientos ocupados de una función */
exports.getOcupadosByFuncion = async (req, res) => {
  try {
    const { id_funcion } = req.params;

    const result = await pool.query(`
      SELECT id_asiento
      FROM ticket
      WHERE id_funcion = $1
        AND estado = 'pagado'
    `, [id_funcion]);

    res.json(result.rows.map(r => r.id_asiento));
  } catch (err) {
    res.status(500).json({ error: "Error al obtener asientos ocupados" });
  }
};
