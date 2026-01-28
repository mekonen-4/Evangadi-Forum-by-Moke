import bcrypt from "bcrypt";
import { finduserByEmailOrUsername, createUser } from "../model/auth.model.js";

import StatusCodes from 'http-status-codes';

import { generateToken } from "../db/jwt.js";

export const registerUser = async (req, res) => {
    try {
      
        const { username, firstname, lastname, email, password} = req.body;

        // 1. validate input
        if (!username || !firstname || !lastname || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "please fill all the fields"});
        }

        // 2. check if user already exists
        const existingUser = await finduserByEmailOrUsername(email, username);
         
        if (existingUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "user already exists"});
        }

        // 3. validate password length
        if (password.length < 8) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "password must be at least 8 characters long"});
        }

        // 4. hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. create new user
        const userId = await createUser(username, firstname, lastname, email, hashedPassword);
        
        // 6. send response
        res.status(StatusCodes.CREATED).json({ message: "user created successfully", userId });

    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "internal server error" });
    }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️ Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2️ check if user exists
    const user = await finduserByEmailOrUsername(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 3️ Compare password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 4️ Generate token
    const token = generateToken(user);

    // 5️ Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userid: user.userid,
        username: user.username,
        email: user.email
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// for checking protected route 
export function checkUser(req, res) {
    const {userid, email, username } =  req.user;
    
    res.status(200).json({
    userid: req.user.userid,
    username: req.user.username,
    email: req.user.email,
  });
}