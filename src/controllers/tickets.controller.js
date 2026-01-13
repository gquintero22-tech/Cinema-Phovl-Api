const pool = require("../config/db");
const crypto = require("crypto");

exports.comprar = async (req, res) => {
  const { id_funcion, id_asiento, id_usuario } = req.body;

  const qr = crypto.randomUUID();

  await pool.query(`
    INSERT INTO ticket (id_funcion, id_asiento, id_usuario, estado, codigo_qr)
    VALUES ($1,$2,$3,'pagado',$4)
  `, [id_funcion, id_asiento, id_usuario, qr]);

  res.json({ message: "Compra exitosa", qr });
};
