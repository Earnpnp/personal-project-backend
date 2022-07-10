const express = require("express");
const { getMe, updateProfile } = require("../controllers/userController");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/me", getMe);
router.put("/", upload.single("profilePic"), updateProfile);

module.exports = router;
