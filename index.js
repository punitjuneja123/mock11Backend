const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const { connection } = require("./config/db.config");
const { tripModel } = require("./model/trip.model");

app.get("/", (req, res) => {
  res.send("welcome to plan my trip");
});

app.post("/post", async (req, res) => {
  let payload = req.body;
  try {
    let postTrip = await new tripModel(payload);
    postTrip.save();
    res.send("trip posted");
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong");
  }
});

app.get("/retrieve", async (req, res) => {
  try {
    let data = await tripModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong");
  }
});

app.delete("/retrieve/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await tripModel.findByIdAndDelete({ _id: id });
    res.send("deleted");
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("something went wrong");
  }
});

app.get("/retrieve/sort/:order", async (req, res) => {
  let order = req.params.order;
  if (order == "lth") {
    let data = await tripModel.find().sort({ budget: 1 });
    res.send(data);
  } else if (order == "htl") {
    let data = await tripModel.find().sort({ budget: -1 });
    res.send(data);
  }
});

app.listen(4500, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("server running at port 4500");
});
