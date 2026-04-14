const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: String,
  duration: String,      // e.g. "2h 30m"
  rating: Number,        // e.g. 8.5
  image: String,         // a poster image URL
  showTimes: [String],   // e.g. ["10:00 AM", "2:00 PM", "7:00 PM"]
});

module.exports = mongoose.model("Movie", movieSchema);