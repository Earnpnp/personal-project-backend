const { Order, OrderItem } = require("../models");
const cloudinary = require("../utils/cloudinary");
exports.createOrder = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { total } = req.body;
    const order = await Order.create({
      total,
      userId: id,
    });
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};

exports.createOrderItem = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { total, quantity, productId, orderId } = req.body;
    const orderItem = await OrderItem.create({
      total,
      quantity,
      productId,
      orderId,
      userId: id,
    });
    res.status(200).json({ orderItem });
  } catch (err) {
    next(err);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const { id } = req.user;
    const order = await Order.findAll({
      where: { id },
    });
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

exports.paymentOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({
      where: { id: orderId },
    });
    order.status = true;

    if (req.file) {
      const uploadStandardImage = await cloudinary.upload(req.file.path);
      order.slip = uploadStandardImage.secure_url;
    }
    await order.save();
    res.json({ message: "order payed" });
  } catch (err) {
    next(err);
  }
};
