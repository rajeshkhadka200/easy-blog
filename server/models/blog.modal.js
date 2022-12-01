import mongoose from "mongoose";

// creating schema for blog

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  markdown: { type: String, required: true },
  cover: { type: String, default: "" },
  original_link: { type: String, default: "" },
  remote_id: {
    dev: { type: String, required: true, default: "" },
    hashnode: { type: String, required: true, default: "" },
  },
  published_on: { type: String, required: true },
});

// Creating model for blog
const blog = mongoose.model("blog", blogSchema);
export default blog;
