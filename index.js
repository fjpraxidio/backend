// Setup dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require('./routes/user')
const product = require('./routes/product')
const order = require('./routes/order')
const { ObjectId } = mongoose.Types;

const app = express();
const port = 4001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())


mongoose.connect("mongodb+srv://fjpraxidio:admin123@praxidiodb.p8dn7db.mongodb.net/Ecommerce_API_TEST?retryWrites=true&w=majority&appName=AtlasApp", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("We're connected to the cloud database"));

app.use("/b1/users", user);
app.use('/b1/products', product);
app.use('/b1/orders', order);

if(require.main == module) {
	app.listen(port, () => console.log(`Server is running at port ${port}`));
}

module.exports = app;

