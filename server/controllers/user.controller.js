import Token from "../models/token.model.js";
import User from "../models/user.model.js";
import { generateToken } from "../services/genetateToken.js";

export const check = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    let user = await User.findOne({
      email,
    });
    console.log(user);
    if (user) {
      // notify for login
      return res.status(200).json({
        action: "login",
      });
    }
    // notify for register
    return res.status(200).json({
      action: "register",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
export const auth = async (req, res) => {
  const { email } = req.body;

  try {
    // check if user already exists
    let user = await User.findOne({
      email,
    });
    if (user) {
      //login
      const { accessToken, refreshToken } = await generateToken(user._id);
      return res.status(200).json({
        message: "User logged in successfully",
        accessToken,
        refreshToken,
      });
    }

    // register a new user
    let newUser = new User(req.body);
    newUser.save();
    const { accessToken, refreshToken } = await generateToken(newUser._id);
    return res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong during auth" });
  }
};

// getUser
export const getUser = async (req, res) => {
  const id = req.user._id;
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// add api keys od dev and hashnode
export const addKeys = async (req, res) => {
  const { userId } = req.params;

  try {
    const { dev_apikey, hashnode_publicationId, hashnode_authorization } =
      req.body.keys;

    // update the api keys
    const updated = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          api_token: req.body.keys,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Keys added successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// logout user
export const logout = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    const data = await Token.findOneAndDelete({ token: refreshToken });
    return res.status(200).json({ error: false, msg: "User logged out" });
  } catch (error) {
    res.status(500).json({ error: true, msg: "Internal server error" });
  }
};
