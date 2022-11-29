import mongoose, { Schema } from "mongoose";

const userTokenSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 86400, // 30 days
  },
});

const Token = mongoose.model("UserToken", userTokenSchema);
export default Token;
