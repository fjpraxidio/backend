const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// Create a Product
module.exports.addProduct = (req, res) => {
	let newProduct = new Product({
		name : req.body.name,
		description : req.body.description,
		price : req.body.price
	});


	return newProduct.save().then((product, error) => {

		if (error) {

			return res.send(false);

		} else {

			return res.send(true);
		}
	})

	.catch(err => res.send(err));
}


// Retrive All Product (Admin Only)
module.exports.retrieveAllAdminHere = (req, res) => {

	return Product.find({}).then(result => {
		return res.send(result);
	})
}



// Retrieve All ACTIVE Products
module.exports.retrieveAllProducts = (req, res) => {
	return Product.find({isActive: true}).then(result => {
		return res.send(result);
	})
}

// Retrieve Single Product
module.exports.getSingleProduct = (req, res) => {

	return Product.findById(req.params.productId).then(result => {
		return res.send(result);
	})
}

// Update Product Information (admin only)
module.exports.updateProduct = (req, res) => {

	let updatedProduct = {
		name: req.body.name,
		description: req.body.description,
		price: req.body.price
	}

	return Product.findByIdAndUpdate(req.params.productId, updatedProduct).then((product, error) => {

		if(error) {
			return res.send(false);
		} else {
			return res.send(updatedProduct);
		}
	})
}


// Archive Product (Admin Only)
module.exports.archiveProduct = (req, res) => {

	let updateActiveField = {
		isActive: false
	}

	return Product.findByIdAndUpdate(req.params.productId, updateActiveField)
	.then((product, error) => {

		if(error){
			return res.send(false)

	
		} else {
			return res.send(true)
		}
	})
	.catch(err => res.send(err))

};


// Activate a Product

module.exports.activateProduct = (req, res) => {

	let updateActiveField = {
		isActive: true
	}

	return Product.findByIdAndUpdate(req.params.productId, updateActiveField)
	.then((product, error) => {

		if(error){
			return res.send(false)

		} else {
			return res.send(true)
		}
	})
	.catch(err => res.send(err))

};

