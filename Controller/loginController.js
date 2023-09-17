const db = require("../Module/allData"); // Import your database connection
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

exports.login = (req, res) => {
  console.log("Request received for /login");
  const { email, password, role_id } = req.body;

  console.log("Email:", email);
  console.log("Password:", password);
  console.log("role_id:", role_id);

  try {
    const query = `SELECT email, password, role_id FROM users WHERE email = ?`;

    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      console.log("Query Results:", results);

      if (results.length === 0) {
        console.error("No user found with email:", email);
        return res
          .status(401)
          .json({ status: "error", message: "Invalid email or password" });
      }

      const user = results[0];
      console.log("Stored Password:", user.password); // Add this line for debugging

      const isPasswordValid = await bcrypt.compare(password, user.password);

      console.log("isPasswordValid:", isPasswordValid);

      if (!isPasswordValid) {
        console.error("Invalid password for email:", email);
        return res
          .status(401)
          .json({ status: "error", message: "Invalid email or password" });
      }

      //  Generate a JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.SECRETKEY,
        { expiresIn: "1h" }
      );
      console.log(`token: ${token}`);
      // Send the token in the response
      return res
        .status(200)
        .json({ status: "success", token, message: "Login successful" });
    });
  } catch (err) {
    console.log(err);
    return res.json({ error: err });
  }
};


exports.getUsers  = (req, res) => {

  const query = 'SELECT username  FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
}