import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ color: "white", padding: "40px" }}>Loading...</p>;
  if (!movie) return <p style={{ color: "white", padding: "40px" }}>Movie not found.</p>;

  function handleBookNow() {
    if (!selectedTime) {
      alert("Please select a show time first!");
      return;
    }
    // Save selected time to localStorage so Phase 3 can use it
    localStorage.setItem(
      "selectedShow",
      JSON.stringify({ movieId: movie._id, movieTitle: movie.title, time: selectedTime })
    );
    navigate(`/seats/${movie._id}`);
  }

  return (
    <div style={styles.page}>
      {/* Back button */}
      <button style={styles.backBtn} onClick={() => navigate("/")}>
        ← Back
      </button>

      <div style={styles.container}>
        {/* Left: Poster */}
        <img src={movie.image} alt={movie.title} style={styles.poster} />

        {/* Right: Details */}
        <div style={styles.details}>
          <h1 style={styles.title}>{movie.title}</h1>
          <p style={styles.meta}>
            {movie.genre} &nbsp;|&nbsp; {movie.duration} &nbsp;|&nbsp; ⭐ {movie.rating}
          </p>
          <p style={styles.description}>{movie.description}</p>

          {/* Show times */}
          <h3 style={{ color: "white", marginTop: "28px" }}>Select Show Time</h3>
          <div style={styles.times}>
            {movie.showTimes.map((time) => (
              <button
                key={time}
                style={{
                  ...styles.timeBtn,
                  background: selectedTime === time ? "#e50914" : "#333",
                  border: selectedTime === time ? "1px solid #e50914" : "1px solid #555",
                }}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>

          <button style={styles.bookBtn} onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#141414",
    padding: "32px",
  },
  backBtn: {
    background: "transparent",
    color: "#aaa",
    border: "1px solid #555",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "24px",
    fontSize: "14px",
  },
  container: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
  },
  poster: {
    width: "280px",
    borderRadius: "12px",
    objectFit: "cover",
  },
  details: {
    flex: 1,
    minWidth: "280px",
  },
  title: {
    color: "white",
    fontSize: "32px",
    margin: "0 0 10px",
  },
  meta: {
    color: "#aaa",
    fontSize: "15px",
    marginBottom: "16px",
  },
  description: {
    color: "#ccc",
    lineHeight: "1.7",
    fontSize: "15px",
  },
  times: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "12px",
  },
  timeBtn: {
    padding: "10px 18px",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  bookBtn: {
    marginTop: "32px",
    padding: "14px 40px",
    background: "#e50914",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default MovieDetail;