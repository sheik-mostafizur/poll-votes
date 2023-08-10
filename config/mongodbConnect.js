require("dotenv").config();
const mongoose = require("mongoose");

const mongodbConnect = () => mongoose.connect(process.env.MONGODB_URL);

module.exports = mongodbConnect;
