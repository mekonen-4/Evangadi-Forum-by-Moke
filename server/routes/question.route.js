import express from "express";
import {
  askQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,   
  deleteQuestion,
} from "../controller/question.controller.js";

const router = express.Router();

router.post("/askquestion", askQuestion);
router.get("/getallquestions", getAllQuestions);
router.get("/getsinglequestion/:questionid", getSingleQuestion);
router.patch("/updatequestion/:questionid", editQuestion); // Moved above export
router.delete("/deletequestion/:questionid", deleteQuestion); // Moved above export

export default router; // This MUST be at the bottom