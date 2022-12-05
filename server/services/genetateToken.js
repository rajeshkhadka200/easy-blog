import jwt from "jsonwebtoken";
import Token from "../models/token.model.js";

export const generateToken = async (user_id) => {
  try {
    const payload = {
      _id: user_id,
    };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "30d",
      }
    );
    const userToken = await Token.findOne({
      user_id,
    });
    if (userToken) {
      await userToken.remove();
    }
    const dataToken = new Token({
      user_id,
      token: refreshToken,
    });
    dataToken.save();
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong during generating token" });
  }
};
