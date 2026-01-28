import db from "../db/dbConfig.js";

// find user by email or username
export const finduserByEmailOrUsername = async (email, username) => {
  const sql = `
    SELECT * FROM users WHERE email = ? OR username = ?
    `;
  const [rows] = await db.query(sql, [email, username]);
  return rows[0];
};

// create new user
// create new user
export const createUser = async (
  username,
  firstname,
  lastname,
  email, // Fixed typo here (was eamil)
  password
) => {
  const sql = `
    INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)
    `;
  const [result] = await db.query(sql, [
    username,
    firstname,
    lastname,
    email, // Fixed typo here (was eamil)
    password,
  ]);

  return result.insertId;
};

// find user by email
export const finduserByEmail = async (email) => {
  const sql = `
    SELECT * FROM users WHERE email = ?
    `;
  const [rows] = await db.query(sql, [email]);
  return rows[0];
};