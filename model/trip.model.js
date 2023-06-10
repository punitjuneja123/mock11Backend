const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
  name: String,
  email: String,
  destination: String,
  travellers: Number,
  budget: Number,
});

const tripModel = mongoose.model("trip", tripSchema);

module.exports = { tripModel };
