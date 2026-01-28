import express from "express";
import { registerUser, loginUser, checkUser } from "../controller/auth.controller.js";

import { authMiddleware } from '../middlewares/auth.Middleware.js';

const router = express.Router();
// register routes
router.post('/register', registerUser);
// POST /api/users/login


// POST /api/users/login
router.post("/login", loginUser);

// check user 
router.get('/check', authMiddleware, checkUser);



export default router;