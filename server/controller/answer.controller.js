import { StatusCodes } from "http-status-codes";
import {
  getAnswersByQuestionId,
  createAnswer,
  updateAnswerById,
  deleteAnswerById,
} from "../model/answer.model.js";

export const getAnswerByQuestionId = async (req, res) => {
  try {
    // FIX: Check req.params for the ID. It might be questionid, questionId, or id
    // Check your console logs to see what is actually coming in!
    console.log("Req Params:", req.params); 
    
    const questionId = req.params.questionId || req.params.questionid || req.params.id;

    if (!questionId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Question ID" });
    }

    const [rows] = await getAnswersByQuestionId(questionId);
    return res.status(StatusCodes.OK).json(rows);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An unexpected error occurred",
      err: error.message,
    });
  }
};

export const postAnswer = async (req, res) => {
  try {
    const { questionid, answer } = req.body;
    const userid = req.user.userid;

    if (!answer) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide an answer" });
    }

    const [result] = await createAnswer(questionid, userid, answer);

    res.status(StatusCodes.CREATED).json({
      msg: "Answer posted successfully",
      answerid: result.insertId, // Crucial for React to 'see' the new answer immediately
      userid: userid
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};

export const editAnswer = async (req, res) => {
  const { answer } = req.body;
  const { answerid } = req.params; 
  const userid = req.user.userid;

  try {
    const [result] = await updateAnswerById(answer, answerid, userid);
    if (result.affectedRows === 0) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "Unauthorized" });
    }
    res.status(StatusCodes.OK).json({ message: "Answer updated" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const deleteAnswer = async (req, res) => {
  const { answerid } = req.params;
  const userid = req.user.userid;

  try {
    const [result] = await deleteAnswerById(answerid, userid);
    if (result.affectedRows === 0) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "Unauthorized" });
    }
    res.status(StatusCodes.OK).json({ message: "Answer deleted" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};