const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");

exports.getMe = async (req, res) => {
  const user = req.user;
  res.json({ user });
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { address, phoneNumber } = req.body;
    console.log(req.body);
    const updateUser = {};
    console.log("1");
    if (req.file) {
      const result = await cloudinary.upload(req.file.path);
      console.log("3");
      if (req.user.profilePic) {
        const splited = req.user.profilePic.split("/");
        const publicId = splited[splited.length - 1].split(".")[0];
        await cloudinary.destroy(publicId);
      }
      updateUser.profilePic = result.secure_url;
    }
    console.log("2");
    await User.update(
      {
        profilePic: updateUser.profilePic,
        address: address,
        phoneNumber: phoneNumber,
      },
      { where: { id: req.user.id } }
    );
    console.log("4");

    const updatedInfo = await User.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ["password"] },
    });
    res.json(updatedInfo);
  } catch (err) {
    next(err);
  } finally {
    if (req.files) {
      fs.unlinkSync(req.files.path);
    }
  }
};
