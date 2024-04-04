const express = require('express');
const orderController = require("../controllers/orderController");
const auth = require("../auth");
const router = express.Router();
const { verify, verifyAdmin } = auth;


router.post(
  "/:id",
  verify,
  orderController.authorizeUserOrder,
  orderController.orderProduct
);


router.get("/getOrder", verify, verifyAdmin, orderController.getAuthenticatedOrders)

router.get("/getAll", verify, verifyAdmin, orderController.getAllOrder)

// [Add to Cart]
router.post("/cart/:userId", verify, orderController.addToCart);


module.exports = router;