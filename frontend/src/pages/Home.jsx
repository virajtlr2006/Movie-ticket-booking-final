import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={{ margin: 0, color: "white" }}>🎬 MovieBook</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "#ccc" }}>Hi, {user?.name}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <h3 style={{ color: "#fff", marginBottom: "20px" }}>Now Showing</h3>

        {loading ? (
          <p style={{ color: "#ccc" }}>Loading movies...</p>
        ) : (
          <div style={styles.grid}>
            {movies.map((movie) => (
              <div
                key={movie._id}
                style={styles.card}
                onClick={() => navigate(`/movie/${movie._id}`)}
              >
                <img src={movie.image} alt={movie.title} style={styles.poster} />
                <div style={styles.cardBody}>
                  <h4 style={styles.title}>{movie.title}</h4>
                  <p style={styles.meta}>
                    {movie.genre} &nbsp;|&nbsp; {movie.duration}
                  </p>
                  <p style={styles.rating}>⭐ {movie.rating}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#141414",
  },
  navbar: {
    background: "#1a1a1a",
    padding: "16px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #333",
  },
  logoutBtn: {
    padding: "8px 16px",
    background: "#e50914",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  content: {
    padding: "32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "24px",
  },
  card: {
    background: "#1f1f1f",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.2s",
    border: "1px solid #333",
  },
  poster: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
    display: "block",
  },
  cardBody: {
    padding: "12px",
  },
  title: {
    color: "white",
    margin: "0 0 6px",
    fontSize: "15px",
  },
  meta: {
    color: "#aaa",
    fontSize: "13px",
    margin: "0 0 4px",
  },
  rating: {
    color: "#f5c518",
    fontSize: "13px",
    margin: 0,
  },
};

export default Home;