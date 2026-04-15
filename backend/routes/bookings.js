const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// GET already booked seats for a movie + showtime
router.get("/booked-seats", async (req, res) => {
  const { movieId, showTime } = req.query;
  try {
    const bookings = await Booking.find({ movieId, showTime });
    const bookedSeats = bookings.flatMap((b) => b.seats);
    res.json({ bookedSeats });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// GET all bookings for a specific user
router.get("/my-bookings", async (req, res) => {
  const { userId } = req.query;
  try {
    const bookings = await Booking.find({ userId }).sort({ bookedAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// POST — save a new booking
router.post("/", async (req, res) => {
  const { userId, movieId, movieTitle, showTime, seats } = req.body;
  try {
    const newBooking = new Booking({
      userId,
      movieId,
      movieTitle,
      showTime,
      seats,
    });
    await newBooking.save();
    res.status(201).json({ message: "Booking confirmed!", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;