const express = require("express");
const {
  createOrder,
  createOrderItem,
  paymentOrder,
} = require("../controllers/orderController");

const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/addorder", createOrder);
router.post("/orderitem", createOrderItem);
router.post("/payment/:orderId", upload.single("image"), paymentOrder);

module.exports = router;
