const pool = require("../config/db");
const crypto = require("crypto");

exports.comprar = async (req, res) => {
  const { id_funcion, id_asientos, id_usuario } = req.body;

  try {
    await pool.query("BEGIN");

    for (const id_asiento of id_asientos) {

      const ocupado = await pool.query(`
        SELECT 1 FROM ticket
        WHERE id_funcion = $1
          AND id_asiento = $2
          AND estado = 'pagado'
      `, [id_funcion, id_asiento]);

      if (ocupado.rowCount > 0) {
        await pool.query("ROLLBACK");
        return res.status(409).json({
          error: `El asiento ${id_asiento} ya está ocupado`
        });
      }

      await pool.query(`
        INSERT INTO ticket (id_funcion, id_asiento, id_usuario, estado, codigo_qr)
        VALUES ($1,$2,$3,'pagado',$4)
      `, [id_funcion, id_asiento, id_usuario, crypto.randomUUID()]);
    }

    await pool.query("COMMIT");

    const tickets = await pool.query(`
      SELECT 
        t.id_asiento,
        t.codigo_qr,
        p.titulo AS pelicula,
        f.fecha,
        f.hora_inicio
      FROM ticket t
      JOIN funcion f ON t.id_funcion = f.id_funcion
      JOIN pelicula p ON f.id_pelicula = p.id_pelicula
      WHERE t.id_usuario = $1
      ORDER BY t.id_ticket DESC
      LIMIT $2
    `, [id_usuario, id_asientos.length]);

    res.json({
      message: "Compra exitosa",
      tickets: tickets.rows
    });

  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Error al procesar la compra" });
  }
};
