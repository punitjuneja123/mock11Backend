const express = require("express");
const { tripModel } = require("../model/trip.model");
const tripRoute = express.Router();

// const { tripModel } = require("../model/trip.model");

tripRoute.get("/retrieve", (req, res) => {
  res.send("test");
});

tripRoute.post("/post", async (req, res) => {
  let payload = req.body;
  try {
    let postTrip = await tripModel.findByIdandDelete;
    postTrip.save();
    res.send("trip posted");
  } catch (error) {
    console.log(error);
    res.send("something went wrong");
  }
});

module.exports = { tripRoute };
