import db from "../db/dbConfig.js";

export const getAnswersByQuestionId = (questionid) => {
  const sql = `
    SELECT 
      a.answerid,
      a.userid,
      a.questionid,
      a.answer,
      a.createdAt, 
      u.username 
    FROM answers a
    LEFT JOIN users u ON a.userid = u.userid
    WHERE a.questionid = ?
    ORDER BY a.answerid DESC
  `; 
  // Note: I changed ORDER BY to answerid DESC as a backup 
  // until you add the createdAt column.
  return db.query(sql, [questionid]);
};

// ... keep your other export functions (createAnswer, etc.) exactly as they are
export const createAnswer = (questionid, userid, answer) => {
  const sql = `INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)`;
  return db.query(sql, [questionid, userid, answer]);
};

export const updateAnswerById = (answer, answerid, userid) => {
  const sql = `UPDATE answers SET answer = ? WHERE answerid = ? AND userid = ?`;
  return db.query(sql, [answer, answerid, userid]);
};

export const deleteAnswerById = (answerid, userid) => {
  const sql = `DELETE FROM answers WHERE answerid = ? AND userid = ?`;
  return db.query(sql, [answerid, userid]);
};