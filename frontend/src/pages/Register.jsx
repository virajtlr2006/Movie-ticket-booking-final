import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...form,
        email: form.email.trim().toLowerCase(),
      };

      await axios.post("http://localhost:5000/api/auth/register", payload);
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-md w-full bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-2">Create your account</h2>
        <p className="text-gray-400 mb-6">Join MovieBook to book seats instantly.</p>

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white"
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="w-full btn-primary py-3">Create account</button>
        </form>

        <div className="mt-6 text-center text-gray-400">Already have an account? <Link className="text-indigo-300 font-medium" to="/login">Sign in</Link></div>
      </div>
    </div>
  );
}

export default Register;