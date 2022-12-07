import mongoose from "mongoose";

// creating schema for blog

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  markdown: { type: String, required: true },
  cover: { type: String },
  original_link: { type: String },
  remote_id: {
    dev: { type: String, default: "" },
    hashnode: { type: String, default: "" },
  },
  published_by: { type: String, required: true },
  published_on: { type: String, required: true },
  published_by_profile: { type: String, required: true },
});

// Creating model for blog
const blogModal = mongoose.model("blog", blogSchema);
export default blogModal;
