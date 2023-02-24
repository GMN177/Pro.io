const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
  playersNumber: Number,
});

gameExport = mongoose.model("user", gameSchema)

module.exports = gameExport
