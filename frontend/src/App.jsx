import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import SeatSelection from "./pages/SeatSelection";
import ConfirmBooking from "./pages/ConfirmBooking";
import MyBookings from "./pages/MyBookings";

function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/movie/:id" element={<PrivateRoute><MovieDetail /></PrivateRoute>} />
        <Route path="/seats/:movieId" element={<PrivateRoute><SeatSelection /></PrivateRoute>} />
        <Route path="/confirm" element={<PrivateRoute><ConfirmBooking /></PrivateRoute>} />
        <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;