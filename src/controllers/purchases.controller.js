const pool = require("../config/db");

exports.createPurchase = async (req, res) => {
  const { user_id, showtime_id, total, payment_method } = req.body;

  const result = await pool.query(
    `INSERT INTO purchases(user_id, showtime_id, total, payment_method)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [user_id, showtime_id, total, payment_method]
  );

  res.json(result.rows[0]);
};

exports.history = async (req, res) => {
  const userId = req.user.id;

  const result = await pool.query(
    "SELECT * FROM purchases WHERE user_id=$1",
    [userId]
  );

  res.json(result.rows);
};
