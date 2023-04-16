const mongoose = require("mongoose");

const playSchema = new mongoose.Schema({
    match: [mongoose.Types.ObjectId],
    user: [mongoose.Types.ObjectId],
    isWinner: Boolean,
    points: Number
});

playExport = mongoose.model("play", playSchema)

module.exports = playExport
