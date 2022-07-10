const { Cart, Product } = require("../models");
const createError = require("../utils/createError");

exports.createCart = async (req, res, next) => {
  try {
    // const cart = await Cart.findAll();
    const { quantity, productId } = req.body;

    const mapItems = await Cart.findOne({
      where: { productId: productId, userId: req.user.id },
    });

    if (mapItems) {
      mapItems.quantity = mapItems.quantity + 1;
      await mapItems.save();
      res.status(200).json(mapItems);
    } else {
      const items = await Cart.create({
        quantity: quantity >= 1 ? quantity : 1,
        productId,
        userId: req.user.id,
      });
      res.status(200).json(items);
    }
  } catch (err) {
    next(err);
  }
};

exports.incrementCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { total } = req.body;
    console.log(total);

    const cartIncerate = await Cart.findOne({
      where: { id },
    });

    await Cart.update({ quantity: total }, { where: { id: cartIncerate.id } });
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const itemsCart = await Cart.findAll({
      where: { userId: userId },
    });

    if (!itemsCart) {
      createError("Empty", 401);
    }

    res.status(200).json(itemsCart);
  } catch (err) {
    next(err);
  }
};

exports.getCartById = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(id);
    const cart = await Cart.findAll({
      where: { userId: id },
      include: { model: Product },
    });
    if (!cart) createError("cart not found", 400);
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log("id");
    const cartDelete = await Cart.findOne({
      where: { id },
    });
    if (!cartDelete) {
      createError("Cart not found", 400);
    }
    await Cart.destroy({ where: { id } });
    res.status(200).json();
  } catch (err) {
    next(err);
  }
};
