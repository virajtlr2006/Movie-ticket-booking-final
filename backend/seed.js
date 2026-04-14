const mongoose = require("mongoose");
const Movie = require("./models/Movie");

const movies = [
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: "Sci-Fi",
    duration: "2h 49m",
    rating: 8.6,
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    showTimes: ["10:00 AM", "2:00 PM", "7:00 PM"],
  },
  {
    title: "The Dark Knight",
    description: "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent.",
    genre: "Action",
    duration: "2h 32m",
    rating: 9.0,
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    showTimes: ["11:00 AM", "3:00 PM", "8:00 PM"],
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given a task to plant an idea.",
    genre: "Thriller",
    duration: "2h 28m",
    rating: 8.8,
    image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    showTimes: ["9:00 AM", "1:00 PM", "6:00 PM"],
  },
  {
    title: "The Avengers",
    description: "Earth's mightiest heroes must come together to stop Loki and his alien army from enslaving humanity.",
    genre: "Action",
    duration: "2h 23m",
    rating: 8.0,
    image: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7KE3Xe7my.jpg",
    showTimes: ["10:30 AM", "2:30 PM", "7:30 PM"],
  },
  {
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between two families.",
    genre: "Drama",
    duration: "2h 12m",
    rating: 8.5,
    image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    showTimes: ["12:00 PM", "4:00 PM", "9:00 PM"],
  },
  {
    title: "Dune",
    description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset.",
    genre: "Sci-Fi",
    duration: "2h 35m",
    rating: 8.0,
    image: "https://image.tmdb.org/t/p/w500/d5NXSklpcvkeyd9ho3wBd9pbXjH.jpg",
    showTimes: ["11:30 AM", "3:30 PM", "8:30 PM"],
  },
];

mongoose
  .connect("mongodb://localhost:27017/moviebooking")
  .then(async () => {
    await Movie.deleteMany(); // clear old data
    await Movie.insertMany(movies);
    console.log("Movies added to database!");
    process.exit();
  })
  .catch((err) => console.log(err));