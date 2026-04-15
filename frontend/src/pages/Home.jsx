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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container py-12">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-extrabold leading-tight">Find your next movie night</h1>
            <p className="text-gray-300 mt-3">Browse popular titles, pick a showtime and book seats in seconds.</p>

            <div className="mt-6 flex gap-3">
              <input placeholder="Search movies, genres or actors" className="flex-1 p-3 rounded-md bg-gray-800 border border-gray-700 text-white" />
              <button className="btn-primary">Search</button>
            </div>

            <div className="mt-6 flex gap-3 text-sm text-gray-400">
              <span className="px-3 py-1 bg-gray-800 rounded">Popular</span>
              <span className="px-3 py-1 bg-gray-800 rounded">Action</span>
              <span className="px-3 py-1 bg-gray-800 rounded">Comedy</span>
              <span className="px-3 py-1 bg-gray-800 rounded">Drama</span>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="card p-4">
              <h3 className="text-lg font-semibold">Welcome back{user ? `, ${user.name}` : ''}</h3>
              <p className="text-gray-400 mt-2">Check out trending movies and manage your bookings.</p>
              <div className="mt-4 flex gap-2">
                <button className="btn-primary" onClick={() => navigate('/my-bookings')}>My Bookings</button>
                <button className="btn-ghost" onClick={() => navigate('/login')}>Account</button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Now Showing</h2>

          {loading ? (
            <p className="text-gray-400">Loading movies...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {movies.map((movie) => (
                <div key={movie._id} className="group cursor-pointer" onClick={() => navigate(`/movie/${movie._id}`)}>
                  <div className="rounded overflow-hidden shadow-lg">
                    <img src={movie.image} alt={movie.title} className="w-full h-44 object-cover transform group-hover:scale-105 transition" />
                    <div className="p-3 bg-gray-800 border border-gray-700">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">{movie.title}</h4>
                        <span className="text-yellow-400">⭐ {movie.rating}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{movie.genre} • {movie.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;