require("dotenv").config();
const mongoose = require("mongoose");

const mongodbConnect = () =>
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p7e2eey.mongodb.net/pollVotes?retryWrites=true&w=majority`
  );

module.exports = mongodbConnect;
