import express from "express";
import {authMiddleware} from "./middlewares/auth.Middleware.js";

import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import questionRoutes from "./routes/question.route.js";
import answerRoutes from "./routes/answer.route.js";
import db from "./db/dbConfig.js";

const app = express();

// enable CORS
app.use(cors());

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// middleware to parse JSON bodies
app.use(express.json());

// routes middleware
app.use("/api/auth", authRoutes);
// Questions Route
app.use("/api/questions", authMiddleware, questionRoutes);
// answer route
app.use("/api/answers", authMiddleware, answerRoutes);

const PORT = process.env.PORT || 5500;

async function start() {
  try {
    const result = await db.execute("select 'testing the connection' ");
    console.log("database connected!");
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
start();

export default app;
