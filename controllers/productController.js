const { Product } = require("../models");
const fs = require("fs");
const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");

exports.getAllProduct = async (req, res, next) => {
  try {
    const product = await Product.findAll();
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      createError("Product not found", 404);
    }

    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { nameProduct, price, productType, description } = req.body;

    if (!productType) {
      createError("productType is required", 400);
    }
    console.log(process.env.CLOUDINARY_URL);
    let image;
    if (req.file) {
      console.log("trigger");
      const result = await cloudinary.upload(req.file.path);
      image = result.secure_url;
      console.log("image =========\n", result);
    }

    const product = await Product.create({
      nameProduct,
      price,
      productType,
      description,
      img: image,
    });

    res.status(200).json({ product });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Product = await Product.findOne({
      where: { id },
    });
    if (!Product) {
      createError("Product not found", 400);
    }
    await Product.destroy({ where: { id } });
    res.status(200).json();
  } catch (error) {
    next(err);
  }
};
