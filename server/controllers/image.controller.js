import fs from "fs";
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
