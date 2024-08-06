require("dotenv").config();
require("colors");

const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB connected".green);
  } catch (error) {
    console.log(error);
    throw new Error("Error db connection");
  }
};

module.exports = {
  conn,
};
