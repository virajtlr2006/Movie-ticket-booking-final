import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TICKET_PRICE = 150;

function ConfirmBooking() {
  const navigate = useNavigate();

  // Get everything we saved in Phase 2 and Phase 3
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedShow = JSON.parse(localStorage.getItem("selectedShow"));
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false); // true after booking is saved

  // If anything is missing, go back home
  if (!user || !selectedShow || !selectedSeats) {
    navigate("/");
    return null;
  }

  const totalAmount = selectedSeats.length * TICKET_PRICE;

  async function handleConfirm() {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/bookings", {
        userId: user.id,
        movieId: selectedShow.movieId,
        movieTitle: selectedShow.movieTitle,
        showTime: selectedShow.time,
        seats: selectedSeats,
      });

      // Clean up localStorage — we don't need these anymore
      localStorage.removeItem("selectedShow");
      localStorage.removeItem("selectedSeats");

      setDone(true);
    } catch (error) {
      alert("Booking failed. Please try again.");
    }
    setLoading(false);
  }

  // Show success screen after booking
  if (done) {
    return (
      <div style={styles.page}>
        <div style={styles.successBox}>
          <div style={styles.checkmark}>✓</div>
          <h2 style={styles.successTitle}>Booking Confirmed!</h2>
          <p style={styles.successSub}>Enjoy your movie 🎬</p>
          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            <button style={styles.outlineBtn} onClick={() => navigate("/my-bookings")}>
              View My Bookings
            </button>
            <button style={styles.redBtn} onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Confirm Your Booking</h2>

        {/* Booking Summary */}
        <div style={styles.summaryBox}>
          <Row label="Movie" value={selectedShow.movieTitle} />
          <Row label="Show Time" value={selectedShow.time} />
          <Row label="Seats" value={selectedSeats.join(", ")} />
          <Row label="Tickets" value={`${selectedSeats.length} × ₹${TICKET_PRICE}`} />
          <div style={styles.divider} />
          <Row label="Total Amount" value={`₹${totalAmount}`} big />
        </div>

        {/* Action buttons */}
        <div style={styles.actions}>
          <button style={styles.outlineBtn} onClick={() => navigate(-1)}>
            ← Change Seats
          </button>
          <button
            style={{ ...styles.redBtn, opacity: loading ? 0.7 : 1 }}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Confirming..." : "Confirm & Pay ₹" + totalAmount}
          </button>
        </div>
      </div>
    </div>
  );
}

// Small helper component just for summary rows
function Row({ label, value, big }) {
  return (
    <div style={styles.row}>
      <span style={{ color: "#888", fontSize: big ? "15px" : "14px" }}>{label}</span>
      <span
        style={{
          color: big ? "#e50914" : "white",
          fontWeight: big ? "bold" : "normal",
          fontSize: big ? "18px" : "14px",
        }}
      >
        {value}
      </span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#141414",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
  },
  card: {
    background: "#1f1f1f",
    borderRadius: "12px",
    padding: "40px",
    width: "100%",
    maxWidth: "460px",
    border: "1px solid #333",
  },
  heading: {
    color: "white",
    margin: "0 0 28px",
    fontSize: "22px",
  },
  summaryBox: {
    background: "#141414",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    height: "1px",
    background: "#333",
    margin: "4px 0",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "28px",
    flexWrap: "wrap",
  },
  outlineBtn: {
    flex: 1,
    padding: "12px",
    background: "transparent",
    color: "#ccc",
    border: "1px solid #555",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
  },
  redBtn: {
    flex: 2,
    padding: "12px",
    background: "#e50914",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
  },
  successBox: {
    background: "#1f1f1f",
    borderRadius: "12px",
    padding: "48px 40px",
    textAlign: "center",
    border: "1px solid #333",
    maxWidth: "400px",
    width: "100%",
  },
  checkmark: {
    width: "64px",
    height: "64px",
    background: "#1a3a1a",
    color: "#4caf50",
    fontSize: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    border: "2px solid #4caf50",
  },
  successTitle: {
    color: "white",
    margin: "0 0 8px",
  },
  successSub: {
    color: "#aaa",
    margin: 0,
  },
};

export default ConfirmBooking;