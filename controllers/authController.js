const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const createError = require("../utils/createError");
const { User } = require("../models");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      createError("invalid credential", 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      createError("invalid credential", 400);
    }

    const token = genToken({ id: user.id });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!email) {
      createError("email is required", 400);
    }

    if (!password) {
      createError("password is required", 400);
    }

    if (password !== confirmPassword) {
      createError("password and confirm password did not match", 400);
    }

    const isEmail = validator.isEmail(email + "");
    if (!isEmail) {
      createError("email is invalid format", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email: isEmail ? email : null,
      password: hashedPassword,
    });

    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
