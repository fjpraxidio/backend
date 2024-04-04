const express = require('express');
const productController = require("../controllers/productController");
const auth = require("../auth");
const router = express.Router();
const { verify, verifyAdmin } = auth;


router.post("/", verify, verifyAdmin, productController.addProduct);

router.get("/all", verify, verifyAdmin, productController.retrieveAllAdminHere);

router.get("/getAllproducts", productController.retrieveAllProducts);

router.get("/:productId", productController.getSingleProduct);

router.put("/:productId", verify, verifyAdmin, productController.updateProduct);

router.put("/archive/:productId", verify, verifyAdmin, productController.archiveProduct);


router.put("/activate/:productId", verify, verifyAdmin, productController.activateProduct);

module.exports = router;