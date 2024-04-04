const mongoose = require("mongoose")
const User = require("../models/User");
const Product = require("../models/Product")

const orderSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, "Order userId is required"]
	},
	products: [{
		productId: { 
			type: mongoose.Schema.Types.ObjectId,
			required: [true, "Order productId is required"]
			},
		quantity: {
			type: Number,
			required: [true, "Order quantity is required"]
			}
	}],
	totalAmount: {
		type: Number,
		required: [true, "Order totalAmount is required"]
	},
	purchasedOn: {
		type: Date,
		default: new Date()
	}
})

// Create the model
module.exports = mongoose.model("Order", orderSchema);