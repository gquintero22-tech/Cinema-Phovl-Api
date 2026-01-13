const pool = require("../config/db");
const jwt = require("jsonwebtoken");

/* REGISTRO */
exports.register = async (req, res) => {
  const { nombre, email, telefono, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    await pool.query(
      `INSERT INTO usuario (nombre, email, telefono, password)
       VALUES ($1, $2, $3, $4)`,
      [nombre, email, telefono || null, password]
    );

    res.json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

/* LOGIN */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM usuario
       WHERE email = $1 AND password = $2`,
      [email, password]
    );

    if (!result.rows.length) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const user = result.rows[0];

    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      name: user.nombre,
      email: user.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
