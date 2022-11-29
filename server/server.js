import {} from "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";
import { connectDB } from "./db/connection.js";

// imports routes
import userRoutes from "./routes/user.route.js";
import tokenRoutes from "./routes/token.route.js";

// middleware
app.use(cors());
app.use(express.json());

// conect to db
connectDB();

// setup routes
app.use("/api/user", userRoutes); // this is the route for the user routes
app.use("/api/token", tokenRoutes);
const port = 8000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
