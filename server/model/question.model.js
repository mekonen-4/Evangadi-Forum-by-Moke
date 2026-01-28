import db from "../db/dbConfig.js";

// ================= CREATE QUESTION =================
export const createQuestion = (data) => {
  const sql = `
    INSERT INTO questions (title, description, questionid, userid)
    VALUES (?, ?, ?, ?)
  `;
  return db.query(sql, data);
};

// ================= FIND ALL QUESTIONS =================
export const findAllQuestions = () => {
  const sql = `
    SELECT 
      u.username, 
      q.userid,
      q.id,
      q.questionid, 
      q.title, 
      q.description, 
      q.createdAt AS question_date 
    FROM questions q
    JOIN users u ON q.userid = u.userid
    ORDER BY q.createdAt DESC
  `;
  return db.query(sql);
};

// ================= FIND QUESTION BY ID =================
export const findQuestionById = (questionid) => {
  const sql = `
    SELECT 
      u.username, 
      q.title, 
      q.description, 
      q.createdAt AS qtn_createdAt
    FROM questions q
    JOIN users u ON q.userid = u.userid
    WHERE q.questionid = ?
  `;
  return db.query(sql, [questionid]);
};
// ================= UPDATE QUESTION =================
export const updateQuestionById = (title, description, questionid, userid) => {
  const sql = `
    UPDATE questions 
    SET title = ?, description = ? 
    WHERE questionid = ? AND userid = ?
  `;
  return db.query(sql, [title, description, questionid, userid]);
};

// ================= DELETE QUESTION =================
export const deleteQuestionById = (questionid, userid) => {
  // We check both questionid and userid to ensure only the owner can delete it
  const sql = `DELETE FROM questions WHERE questionid = ? AND userid = ?`;
  return db.query(sql, [questionid, userid]);
};