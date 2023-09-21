const express = require("express");
const db = require("../Module/allData");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

// Handle user signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password, role_id, token } = req.body;

    if (!username || !password) {
      throw new Error("All fields must be filled");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const Values = [username, email, hash, role_id];
    const userInfoQuery = `INSERT INTO users (username,email, password ,role_id ) 
    VALUES (?,?,?,?) `;

    console.log("SQL Query:", userInfoQuery);
    console.log("Values:", Values);

    db.query(userInfoQuery, Values, function (err, results) {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          console.error("Duplicate email:", email);
          return res
            .status(409)
            .json({ status: "error", message: "Email already exists" });
        }

        console.error("MySQL Error:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Error inserting user info" });
      }
      console.log("Query Results:", results);

      if (results.affectedRows === 1) {
        // User was successfully inserted
        const userQuery = "SELECT * FROM users WHERE email = ?";
        db.query(userQuery, [email], function (err, userResults) {
          if (err) {
            console.error("MySQL Error:", err);
            return res
              .status(500)
              .json({ status: "error", message: "Error fetching user info" });
          }

          if (userResults.length === 0) {
            console.error("No user found with email:", email);
            return res
              .status(401)
              .json({ status: "error", message: "Invalid email or password" });
          }

          const user = userResults[0];
          console.log(userResults);

          // Generate a JWT token
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.SECRETKEY,
            { expiresIn: "1h" }
          );

          // Update the user's token in the database
          const updateTokenQuery = "UPDATE users SET token = ? WHERE id = ?";
          db.query(
            updateTokenQuery,
            [token, user.id],
            function (err, updateResult) {
              if (err) {
                console.error("MySQL Error:", err);
                return res
                  .status(500)
                  .json({
                    status: "error",
                    message: "Error updating user token",
                  });
              }

              return res.status(200).json({
                status: "success",
                token,
                message: "Values inserted successfully",
              });
            }
          );
        });
      } else {
        console.error("No rows were affected by the insert operation.");
        return res
          .status(500)
          .json({ status: "error", message: "Error inserting user info" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred",
      error: error.message,
    });
  }
};
