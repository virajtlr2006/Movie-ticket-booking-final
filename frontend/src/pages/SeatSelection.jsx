import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ROWS = ["A", "B", "C", "D", "E"];
const SEATS_PER_ROW = 8;
const TICKET_PRICE = 150;

function SeatSelection() {
  const navigate = useNavigate();
  const selectedShow = JSON.parse(localStorage.getItem("selectedShow"));

  const [bookedSeats, setBookedSeats] = useState([]);
  const [mySeats, setMySeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedShow) {
      navigate("/");
      return;
    }

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

  function toggleSeat(seatName) {
    if (bookedSeats.includes(seatName)) return;
    if (mySeats.includes(seatName)) {
      setMySeats(mySeats.filter((s) => s !== seatName));
    } else {
      setMySeats([...mySeats, seatName]);
    }
  }

  function handleProceed() {
    if (mySeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }
    localStorage.setItem("selectedSeats", JSON.stringify(mySeats));
    navigate("/confirm");
  }

  function seatClass(seatName) {
    if (bookedSeats.includes(seatName)) return 'bg-gray-700 text-gray-400 cursor-not-allowed';
    if (mySeats.includes(seatName)) return 'bg-brand text-white';
    return 'bg-gray-800 text-gray-200';
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-gradient-to-b from-gray-700 to-gray-800 p-4 rounded-lg text-center text-gray-200 tracking-widest mb-6">SCREEN</div>

            <div className="bg-gray-900 p-4 rounded-lg">
              {ROWS.map((row) => (
                <div key={row} className="flex items-center gap-4 mb-3">
                  <div className="w-6 text-center text-gray-400 font-medium">{row}</div>
                  <div className="flex gap-3">
                    {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                      const seatName = `${row}${i + 1}`;
                      return (
                        <button
                          key={seatName}
                          className={`w-11 h-11 rounded-md font-semibold ${seatClass(seatName)} border border-gray-700 shadow-sm`}
                          onClick={() => toggleSeat(seatName)}
                          title={seatName}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-6 mt-6 text-gray-400">
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-800 border rounded" /> <span>Available</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-brand rounded" /> <span>Selected</span></div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-700 rounded" /> <span>Booked</span></div>
            </div>
          </div>

          <aside className="w-full lg:w-96">
            <div className="card p-4">
              <h3 className="text-lg font-semibold">Your selection</h3>
              <p className="text-gray-400 mt-2">{selectedShow?.movieTitle} • {selectedShow?.time}</p>

              <div className="mt-4 bg-gray-800 p-3 rounded">
                <p className="text-sm text-gray-300">Seats: <span className="font-medium">{mySeats.length ? mySeats.join(', ') : '—'}</span></p>
                <p className="text-sm text-gray-300 mt-2">Total: <span className="font-semibold">₹{mySeats.length * TICKET_PRICE}</span></p>
              </div>

              <button className="btn-primary w-full mt-4" onClick={handleProceed} disabled={mySeats.length===0}>Proceed to Confirm</button>
              <button className="btn-ghost w-full mt-3" onClick={() => navigate(-1)}>Change show</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default SeatSelection;