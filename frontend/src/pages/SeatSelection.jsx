import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Rows A to E, seats 1 to 8
const ROWS = ["A", "B", "C", "D", "E"];
const SEATS_PER_ROW = 8;
const TICKET_PRICE = 150; // rupees

function SeatSelection() {
  const navigate = useNavigate();

  // Get the show the user picked in Phase 2
  const selectedShow = JSON.parse(localStorage.getItem("selectedShow"));

  const [bookedSeats, setBookedSeats] = useState([]); // seats already taken
  const [mySeats, setMySeats] = useState([]);          // seats I am picking
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user lands here without picking a show, send them back
    if (!selectedShow) {
      navigate("/");
      return;
    }

    // Fetch which seats are already booked for this movie + time
    axios
      .get("http://localhost:5000/api/bookings/booked-seats", {
        params: {
          movieId: selectedShow.movieId,
          showTime: selectedShow.time,
        },
      })
      .then((res) => {
        setBookedSeats(res.data.bookedSeats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedShow, navigate]);

  // Called when user clicks a seat
  function toggleSeat(seatName) {
    // If seat is already booked by someone else, do nothing
    if (bookedSeats.includes(seatName)) return;

    // If I already picked this seat, remove it. Otherwise add it.
    if (mySeats.includes(seatName)) {
      setMySeats(mySeats.filter((s) => s !== seatName));
    } else {
      setMySeats([...mySeats, seatName]);
    }
  }

  // Figure out what color/style to show for each seat
  function getSeatStyle(seatName) {
    if (bookedSeats.includes(seatName)) return styles.seatBooked;
    if (mySeats.includes(seatName)) return styles.seatSelected;
    return styles.seatAvailable;
  }

  function handleProceed() {
    if (mySeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }

    // Save my seat picks so the next page (confirmation) can use them
    localStorage.setItem(
      "selectedSeats",
      JSON.stringify(mySeats)
    );

    navigate("/confirm");
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div>
          <h2 style={styles.movieTitle}>{selectedShow.movieTitle}</h2>
          <p style={styles.showTime}>🕐 {selectedShow.time}</p>
        </div>
      </div>

      {loading ? (
        <p style={{ color: "#ccc", padding: "40px" }}>Loading seats...</p>
      ) : (
        <div style={styles.content}>

          {/* Screen indicator */}
          <div style={styles.screenWrapper}>
            <div style={styles.screen}>SCREEN</div>
          </div>

          {/* Seat Grid */}
          <div style={styles.grid}>
            {ROWS.map((row) => (
              <div key={row} style={styles.row}>
                {/* Row label on the left */}
                <span style={styles.rowLabel}>{row}</span>

                {/* Seats in this row */}
                {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                  const seatName = `${row}${i + 1}`;
                  return (
                    <button
                      key={seatName}
                      style={{ ...styles.seat, ...getSeatStyle(seatName) }}
                      onClick={() => toggleSeat(seatName)}
                      title={seatName}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendBox, ...styles.seatAvailable }} />
              <span>Available</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendBox, ...styles.seatSelected }} />
              <span>Selected</span>
            </div>
            <div style={styles.legendItem}>
              <div style={{ ...styles.legendBox, ...styles.seatBooked }} />
              <span>Booked</span>
            </div>
          </div>

          {/* Summary bar at the bottom */}
          {mySeats.length > 0 && (
            <div style={styles.summaryBar}>
              <div>
                <p style={styles.summaryText}>
                  Selected: <strong>{mySeats.join(", ")}</strong>
                </p>
                <p style={styles.summaryText}>
                  Total: <strong>₹{mySeats.length * TICKET_PRICE}</strong>
                  &nbsp;({mySeats.length} ticket{mySeats.length > 1 ? "s" : ""} × ₹{TICKET_PRICE})
                </p>
              </div>
              <button style={styles.proceedBtn} onClick={handleProceed}>
                Proceed to Confirm →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#141414",
    color: "white",
  },
  header: {
    background: "#1a1a1a",
    padding: "16px 32px",
    borderBottom: "1px solid #333",
    display: "flex",
    alignItems: "center",
    gap: "20px",
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
  movieTitle: {
    margin: 0,
    color: "white",
    fontSize: "20px",
  },
  showTime: {
    margin: "4px 0 0",
    color: "#aaa",
    fontSize: "14px",
  },
  content: {
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  screenWrapper: {
    width: "100%",
    maxWidth: "520px",
    marginBottom: "32px",
  },
  screen: {
    background: "linear-gradient(to bottom, #555, #222)",
    color: "#aaa",
    textAlign: "center",
    padding: "10px",
    borderRadius: "4px",
    fontSize: "12px",
    letterSpacing: "4px",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  rowLabel: {
    color: "#888",
    fontSize: "14px",
    width: "16px",
    textAlign: "center",
  },
  seat: {
    width: "40px",
    height: "40px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "bold",
  },
  seatAvailable: {
    background: "#2a2a2a",
    color: "#aaa",
    border: "1px solid #444",
  },
  seatSelected: {
    background: "#e50914",
    color: "white",
    border: "1px solid #ff3333",
    cursor: "pointer",
  },
  seatBooked: {
    background: "#444",
    color: "#666",
    cursor: "not-allowed",
    border: "1px solid #333",
  },
  legend: {
    display: "flex",
    gap: "24px",
    marginTop: "28px",
    color: "#aaa",
    fontSize: "13px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  legendBox: {
    width: "20px",
    height: "20px",
    borderRadius: "4px",
  },
  summaryBar: {
    marginTop: "36px",
    background: "#1f1f1f",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "20px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "520px",
    gap: "20px",
    flexWrap: "wrap",
  },
  summaryText: {
    margin: "4px 0",
    color: "#ccc",
    fontSize: "14px",
  },
  proceedBtn: {
    padding: "12px 28px",
    background: "#e50914",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  },
};

export default SeatSelection;