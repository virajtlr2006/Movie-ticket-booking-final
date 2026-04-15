import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyBookings() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings/my-bookings", {
        params: { userId: user.id },
      })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Format date nicely e.g. "15 Apr 2026, 9:30 PM"
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={{ margin: 0, color: "white", cursor: "pointer" }} onClick={() => navigate("/")}>
          🎬 MovieBook
        </h2>
        <button style={styles.backBtn} onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>

      <div style={styles.content}>
        <h3 style={{ color: "white", marginBottom: "24px" }}>My Bookings</h3>

        {loading ? (
          <p style={{ color: "#ccc" }}>Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <div style={styles.emptyBox}>
            <p style={{ color: "#888", fontSize: "16px" }}>You haven't booked anything yet.</p>
            <button style={styles.redBtn} onClick={() => navigate("/")}>
              Browse Movies
            </button>
          </div>
        ) : (
          <div style={styles.list}>
            {bookings.map((booking) => (
              <div key={booking._id} style={styles.card}>
                {/* Left color strip */}
                <div style={styles.strip} />

                <div style={styles.cardBody}>
                  <div style={styles.cardTop}>
                    <h4 style={styles.movieTitle}>{booking.movieTitle}</h4>
                    <span style={styles.badge}>Confirmed</span>
                  </div>

                  <div style={styles.details}>
                    <Detail icon="🕐" text={booking.showTime} />
                    <Detail icon="💺" text={`Seats: ${booking.seats.join(", ")}`} />
                    <Detail icon="🎟️" text={`${booking.seats.length} ticket${booking.seats.length > 1 ? "s" : ""}`} />
                    <Detail icon="💰" text={`₹${booking.seats.length * 150}`} />
                  </div>

                  <p style={styles.bookedAt}>Booked on {formatDate(booking.bookedAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Small helper for detail rows
function Detail({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "14px" }}>{icon}</span>
      <span style={{ color: "#ccc", fontSize: "14px" }}>{text}</span>
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
  backBtn: {
    background: "transparent",
    color: "#aaa",
    border: "1px solid #555",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  content: {
    padding: "32px",
    maxWidth: "700px",
    margin: "0 auto",
  },
  emptyBox: {
    textAlign: "center",
    padding: "48px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  card: {
    background: "#1f1f1f",
    borderRadius: "10px",
    border: "1px solid #333",
    display: "flex",
    overflow: "hidden",
  },
  strip: {
    width: "5px",
    background: "#e50914",
    flexShrink: 0,
  },
  cardBody: {
    padding: "20px 24px",
    flex: 1,
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
  },
  movieTitle: {
    color: "white",
    margin: 0,
    fontSize: "17px",
  },
  badge: {
    background: "#1a3a1a",
    color: "#4caf50",
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "20px",
    border: "1px solid #4caf50",
  },
  details: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "14px",
  },
  bookedAt: {
    color: "#555",
    fontSize: "12px",
    margin: 0,
    borderTop: "1px solid #2a2a2a",
    paddingTop: "12px",
  },
  redBtn: {
    padding: "12px 28px",
    background: "#e50914",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    cursor: "pointer",
  },
};

export default MyBookings;