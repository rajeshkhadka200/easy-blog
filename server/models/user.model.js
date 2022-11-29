import mongoose from "mongoose";

// ce=reating schema for user

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  image: { type: String },
  api_token: {
    hashnode_authorization: { type: String, default: "" },
    hashnode_publicationId: { type: String, default: "" },
    dev_apikey: { type: String, default: "" },
  },
  joined_on: { type: Date, default: Date.now },
});

// Creating model for user
const User = mongoose.model("user", userSchema);
export default User;
