import mongoose from "mongoose";

// creating schema for blog

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  markdown: { type: String, required: true },
  cover: { type: String, required: true },
  original_links: {
    dev: { type: String, required: true },
  },
  remote_id: {
    dev: { type: String, required: true },
    hashnode: { type: String, required: true },
  },
  published_on: { type: String, required: true },
});

// Creating model for blog
const blog = mongoose.model("blog", blogSchema);
export default blog;
