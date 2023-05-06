const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
    game: [mongoose.Types.ObjectId],
    duration: Number,
    startTime: String,
    endTime: String,
    status: String
});

matchExport = mongoose.model("match", matchSchema)

module.exports = matchExport
