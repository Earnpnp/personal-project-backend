const createError = require("../utils/createError");

module.exports = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      createError("You have no permission", 400);
    }
  } catch (err) {
    next(err);
  }
};
