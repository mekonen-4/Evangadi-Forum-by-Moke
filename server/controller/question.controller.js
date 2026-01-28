import { v4 as uuidv4 } from "uuid";
import {
  createQuestion,
  findAllQuestions,
  findQuestionById,
  updateQuestionById, 
  deleteQuestionById
} from "../model/question.model.js";

export const askQuestion = async (req, res) => {
  try {
    const { title, description } = req.body;

    // userid come from JWT
    const userid = req.user.userid;

    if (!userid) {
      return res.status(401).json({
        message: "Unauthorized: user not found in token",
      });
    }

    const questionid = uuidv4();

    await createQuestion([title, description, questionid, userid]);

    res.status(201).json({
      message: "Question created successfully",
      questionid,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllQuestions = async (req, res) => {
  const [rows] = await findAllQuestions();
  res.json(rows);
};

export const getSingleQuestion = async (req, res) => {
  const { questionid } = req.params;
  const [rows] = await findQuestionById(questionid);

  if (!rows.length) {
    return res.status(404).json({ message: "Question not found" });
  }

  res.json(rows[0]);
};
// ================= EDIT QUESTION =================
export const editQuestion = async (req, res) => {
  const { title, description } = req.body;
  const { questionid } = req.params;
  const userid = req.user.userid; // From JWT middleware

  try {
    const [result] = await updateQuestionById(title, description, questionid, userid);
    
    if (result.affectedRows === 0) {
      return res.status(403).json({ message: "You are not authorized to edit this question or it doesn't exist." });
    }

    res.status(200).json({ message: "Question updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= DELETE QUESTION =================
export const deleteQuestion = async (req, res) => {
  // Ensure 'questionid' matches the parameter name in your routes file
  const { questionid } = req.params;
  const userid = req.user.userid;

  try {
    // This call goes to your model. 
    // Because of 'ON DELETE CASCADE', this single query deletes the 
    // question AND all its answers automatically.
    const [result] = await deleteQuestionById(questionid, userid);

    if (result.affectedRows === 0) {
      return res.status(403).json({ 
        message: "You don't have permission to delete this question or it doesn't exist." 
      });
    }

    res.status(200).json({ 
      message: "Question and all associated answers deleted successfully." 
    });
  } catch (err) {
    res.status(500).json({ 
      message: "An error occurred while deleting the question.",
      error: err.message 
    });
  }
};