const mongoose = require("mongoose")
const User = require("../models/User")
const Product = require("../models/Product")
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// Create a order

// Non-admin User Checkout(create order)

module.exports.authorizeUserOrder = (req, res, next) => {
  const requestedUserId = req.params.id;
  const authenticatedUserId = req.user.id;
  const isAdmin = req.user.isAdmin;

  if (isAdmin || requestedUserId === authenticatedUserId) {
    next();
  } else {
    res.status(403).send({
      authorization: "Failed",
      message: "You are not authorized to access this user's orders.",
    });
  }
};

module.exports.orderProduct = async (req, res) => {
  try {
    const buyer = await User.findById(req.params.id);

    if (buyer.isAdmin || req.user.isAdmin) {
      return res.status(403).send({
        message:
          "Action Restricted.",
      });
    }

    const productToBuy = await Product.findById(req.body.productId);

    const quantity = req.body.quantity;

    const totalAmount = productToBuy.price * quantity;

    const transaction = new Order({
      userId: buyer,
      products: [{ productId: productToBuy, quantity }],
      totalAmount,
    });

    await transaction.save();

    res.send({ message: "Order Success" });
  } catch (error) {
    res.send(error)
  }
};


// Retrieve authenticated user's order
module.exports.getAuthenticatedOrders = async (req, res) => {
  try {
   if(!req.user.isAdmin) {
    return res.status(403).send({message: Denied});
   }
    
    const orders = await Order.find(req.body.id);
    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error'});
  }
};


// Retrive ALL Orders
module.exports.getAllOrder = async (req, res) => {
  try {
   if(!req.user.isAdmin) {
    return res.status(403).send({message: Denied});
   }
    
    const orders = await Order.find();
    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send({ error: 'Internal Server Error'});
  }
};



// [Add to Cart]
module.exports.addToCart = async (req, res) => {
  try {

    let buyer = await User.findById(req.params.userId);

  if(buyer.isAdmin) {

    return res.send({message: "Customer Checkout"});

  }

  let item = await Product.findById(req.body.productId);
  let quantity = req.body.quantity;
  let totalAmount = item.price * quantity

  const order = new Order({
    userId: buyer, 
    products: [{productId: item, quantity}],
    totalAmount
  })
  buyer.orders.push(order)

  await buyer.save()

  res.send(order)

  }

  catch(err) {
    
    res.send(err)
  }
}











