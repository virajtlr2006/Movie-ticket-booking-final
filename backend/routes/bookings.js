const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// GET already booked seats for a movie + showtime
// e.g. /api/bookings/booked-seats?movieId=xxx&showTime=7:00 PM
router.get("/booked-seats", async (req, res) => {
  const { movieId, showTime } = req.query;

  try {
    // Find all bookings for this movie and time
    const bookings = await Booking.find({ movieId, showTime });

    // Collect all booked seat names into one flat array
    const bookedSeats = bookings.flatMap((b) => b.seats);

    res.json({ bookedSeats });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;