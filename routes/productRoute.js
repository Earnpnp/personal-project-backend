const express = require("express");
const upload = require("../middlewares/upload");

const router = express.Router();
const {
  getAllProduct,
  getProductById,
  createProduct,
} = require("../controllers/productController");
const authenticate = require("../middlewares/authenticate");

router.get("/all", getAllProduct);
router.get("/productId/:id", getProductById);
router.post("/addproduct", authenticate, upload.single("img"), createProduct);

module.exports = router;
