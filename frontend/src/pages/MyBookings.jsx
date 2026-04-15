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
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

        {loading ? (
          <p className="text-gray-400">Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">You haven't booked anything yet.</p>
            <button className="btn-primary" onClick={() => navigate("/")}>Browse Movies</button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">{booking.movieTitle}</div>
                    <div className="text-sm text-gray-400">{booking.showTime} • {booking.seats.join(', ')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">Confirmed</div>
                    <div className="text-sm text-gray-400">₹{booking.seats.length * 150}</div>
                  </div>
                </div>

                <div className="mt-3 text-gray-500 text-sm">Booked on {formatDate(booking.bookedAt)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;