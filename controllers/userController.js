const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");




// 1. User Registration
module.exports.registerUser = async (reqBody) => {
  try {
    const existingUser = await User.findOne({ email: reqBody.email });

    if (existingUser) {
      
      return false;
    }

    const hashedPassword = bcrypt.hashSync(reqBody.password, 10);

    const newUser = new User({
      firstName: reqBody.firstName,
      lastName: reqBody.lastName,
      mobileNo: reqBody.mobileNo,
      email: reqBody.email,
      password: hashedPassword,
    });

    await newUser.save();

    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
}




// 2. User Authentication/ Login
module.exports.loginUser = (reqBody) => {

  return User.findOne({email: reqBody.email}).then(result => {

    if(result == null) {

      return false;

    } else {

      const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

      if(isPasswordCorrect) {

        return {access : auth.createAccessToken(result)}
      
      } else {

        return false;
      }
    }
  })
  .catch(err => err)
}


// Retrieve User Details
module.exports.getProfile = (req, res) => {

  return User.findById(req.user.id)
  .then(result => {

    result.password = "";

    return res.send(result);

  })
  .catch(err => res.send(err))
};

// Stretch Goals
// Set User To Admin
module.exports.updateUserToAdmin = async (req, res) => {

  const { id } = req.body;

  try {

    const userToUpdate = await User.findById(id);

    if (!userToUpdate) {
      return res.status(404).send({ message: 'User not found' });
    }

    userToUpdate.isAdmin = true;
    await userToUpdate.save();

    return res.status(200).send({ message: 'User updated to admin successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}