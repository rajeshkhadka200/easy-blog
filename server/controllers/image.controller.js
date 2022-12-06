import fs from "fs";
import User from "../models/user.model.js";
export const uploadCover = async (req, res) => {
  try {
    const { cover } = req.files;
    const filename = Date.now() + cover.name.replace(/\s/g, "");
    const url = `${req.protocol}://${req.get("host")}/upload/${filename}`;

    await cover.mv("upload/" + filename, function (err) {
      if (err) {
        throw err;
      }
    });
    return res.status(200).json({
      url,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "unable to upload image",
    });
  }
};

export const changeimage = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { profile } = req.files;
    console.log(profile);
    const filename = Date.now() + profile.name.replace(/\s/g, "");
    const url = `${req.protocol}://${req.get("host")}/upload/${filename}`;

    await profile.mv("upload/" + filename, function (err) {
      if (err) {
        throw err;
      }
    });
    const updated = await User.findByIdAndUpdate(user_id, {
      image: url,
    });
    return res.status(200).json({
      updated,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "unable to upload image",
    });
  }
};
