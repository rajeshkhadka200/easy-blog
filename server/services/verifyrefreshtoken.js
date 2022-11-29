import Token from "../models/token.model.js";
import jwt from "jsonwebtoken";
const verifyrefreshtoken = (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
  const token = Token.findOne({ token: refreshToken });
  if (!token) {
    return { error: true, msg: "Invalid refresh token" };
  }
  const tokenDetails = jwt.verify(refreshToken, privateKey);
  console.log(tokenDetails);

  return { error: false, tokenDetails, msg: "Token verified successfully" };
};
export default verifyrefreshtoken;
