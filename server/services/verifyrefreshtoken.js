import Token from "../models/token.model.js";
import jwt from "jsonwebtoken";
const verifyrefreshtoken = (refreshToken) => {
  try {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
    const token = Token.findOne({ token: refreshToken });
    if (!token) {
      return { error: true, msg: "Invalid refresh token" };
    }
    const tokenDetails = jwt.verify(refreshToken, privateKey);

    return { error: false, tokenDetails, msg: "Token verified successfully" };
  } catch (error) {
    return { error: error, msg: "Invalid refresh token" };
  }
};
export default verifyrefreshtoken;
