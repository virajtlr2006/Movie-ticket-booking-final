import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
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
      <Header />
      <div className="pt-20 min-h-[calc(100vh-160px)]">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/movie/:id" element={<PrivateRoute><MovieDetail /></PrivateRoute>} />
          <Route path="/seats/:movieId" element={<PrivateRoute><SeatSelection /></PrivateRoute>} />
          <Route path="/confirm" element={<PrivateRoute><ConfirmBooking /></PrivateRoute>} />
          <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;