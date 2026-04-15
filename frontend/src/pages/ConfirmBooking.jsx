import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TICKET_PRICE = 150;

function ConfirmBooking() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedShow = JSON.parse(localStorage.getItem("selectedShow"));
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

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

      localStorage.removeItem("selectedShow");
      localStorage.removeItem("selectedSeats");

      setDone(true);
    } catch (error) {
      alert("Booking failed. Please try again.");
    }
    setLoading(false);
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-10 shadow-xl text-center max-w-md w-full border border-gray-700">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-brand text-white text-2xl shadow">✓</div>
          <h2 className="text-2xl text-white mt-4">Booking Confirmed!</h2>
          <p className="text-gray-400">Enjoy your movie 🎬</p>
          <div className="flex gap-3 justify-center mt-6">
            <button className="btn-ghost" onClick={() => navigate("/my-bookings")}>View My Bookings</button>
            <button className="btn-primary" onClick={() => navigate("/")}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-900 rounded-xl p-8 max-w-2xl w-full border border-gray-800 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-4 rounded">
            <h3 className="text-lg font-semibold">Booking Summary</h3>
            <Row label="Movie" value={selectedShow.movieTitle} />
            <Row label="Show Time" value={selectedShow.time} />
            <Row label="Seats" value={selectedSeats.join(", ")} />
            <Row label="Tickets" value={`${selectedSeats.length} × ₹${TICKET_PRICE}`} />
            <div className="border-t border-gray-700 my-3" />
            <Row label="Total Amount" value={`₹${totalAmount}`} big />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">Payment</h3>
              <p className="text-gray-400 mt-2">Payment integration placeholder. You can integrate Stripe/PayPal here.</p>
              <div className="mt-4 space-y-3">
                <input placeholder="Cardholder name" className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white" />
                <input placeholder="Card number" className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white" />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="btn-ghost flex-1" onClick={() => navigate(-1)}>← Change Seats</button>
              <button className="btn-primary flex-1" onClick={handleConfirm} disabled={loading}>{loading ? 'Confirming...' : `Confirm & Pay ₹${totalAmount}`}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, big }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className={`text-gray-400 ${big ? 'text-base' : 'text-sm'}`}>{label}</span>
      <span className={`${big ? 'text-brand font-semibold' : 'text-white'}`}>{value}</span>
    </div>
  );
}

export default ConfirmBooking;