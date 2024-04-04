const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../auth");

const router = express.Router();
const { verify, verifyAdmin } = auth;

// User Registration
router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
})

// User Authentication
router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
})

// Retrieve User Details
router.get("/details", verify, userController.getProfile);


// Set user as Admin
router.post('/updateAdmin', verify, verifyAdmin, userController.updateUserToAdmin);

module.exports = router;