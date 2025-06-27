import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173",
  })
); // Apply rate limiting middleware
app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter); // Apply rate limiting middleware
app.use(cors()); // Enable CORS for all origins

// app.use((req, res, next) => {
//   console.log(`Req.method is ${req.method} & Req URl is '${req.url}'`);
//   next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
