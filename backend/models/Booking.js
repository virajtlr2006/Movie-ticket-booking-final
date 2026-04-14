const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: String,
  movieId: String,
  movieTitle: String,
  showTime: String,
  seats: [String],        // e.g. ["A1", "A2", "B3"]
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);