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

  if (loading) return <p className="p-10 text-gray-300">Loading...</p>;
  if (!movie) return <p className="p-10 text-gray-300">Movie not found.</p>;

  function handleBookNow() {
    if (!selectedTime) {
      alert("Please select a show time first!");
      return;
    }
    localStorage.setItem(
      "selectedShow",
      JSON.stringify({ movieId: movie._id, movieTitle: movie.title, time: selectedTime })
    );
    navigate(`/seats/${movie._id}`);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="relative">
            <img src={movie.image} alt={movie.title} className="w-full max-w-md rounded-xl shadow-2xl object-cover" />
            <div className="absolute bottom-4 left-4 bg-black/40 px-3 py-1 rounded text-sm">{movie.genre} • {movie.duration}</div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-extrabold">{movie.title}</h1>
            <p className="text-yellow-400 mt-2 text-sm">⭐ {movie.rating}</p>
            <p className="text-gray-300 mt-6 leading-relaxed prose prose-invert">{movie.description}</p>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Available Show Times</h3>
              <div className="flex flex-wrap gap-3">
                {movie.showTimes.map((time) => (
                  <button
                    key={time}
                    className={`px-4 py-2 rounded-md text-sm border ${selectedTime === time ? 'bg-brand text-white border-brand' : 'bg-gray-800 border-gray-700'}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                <button className="btn-primary px-6 py-3" onClick={handleBookNow}>Book Now</button>
                <button className="btn-ghost px-4 py-3" onClick={() => navigate(-1)}>← Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;