import {} from "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";
import { connectDB } from "./db/connection.js";
import fileupload from "express-fileupload";
// imports routes
import userRoutes from "./routes/user.route.js";
import tokenRoutes from "./routes/token.route.js";
import blogRoutes from "./routes/blog.route.js";
import imageRoutes from "./routes/image.route.js";

// middleware
app.use(cors());
app.use(express.json());

// conect to db
connectDB();
// file uploader
app.use(fileupload());
app.use("/upload", express.static("upload"));
// setup routes
app.use("/api/user", userRoutes); // this is the route for the user routes
app.use("/api/token", tokenRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/image", imageRoutes);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
