import express from "express";
const router = express.Router();

// Updated import to use named export and correct path per your request
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  postAnswer,
  getAnswerByQuestionId,
  deleteAnswer,
  editAnswer,
} from "../controller/answer.controller.js";

// POST a new answer
router.post("/answerQuestion", authMiddleware, postAnswer);

// GET all answers for a specific question
// Note: questionId here must match req.params.questionId in your controller
router.get("/getAnswer/:questionId", authMiddleware, getAnswerByQuestionId);

// PATCH (Update) a specific answer
// Note: answerid here must match req.params.answerid in your controller
router.patch("/updateAnswer/:answerid", authMiddleware, editAnswer); 

// DELETE a specific answer
router.delete("/deleteAnswer/:answerid", authMiddleware, deleteAnswer);

export default router;