const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/cartId", cartController.getCartById);
router.post("/", cartController.createCart);

router.get("/", cartController.getCart);
router.put("/:id", cartController.incrementCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;
