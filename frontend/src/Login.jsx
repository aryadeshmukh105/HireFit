import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          username: username,
          password: password,
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      navigate("/dashboard");

    } catch (error) {
  console.log("LOGIN ERROR:", error);

  if (error.response) {
    if (error.response.status === 401) {
      setError("Invalid username or password.");
    } else {
      setError(
        `Server error: ${error.response.status}`
      );
    }
  } else {
    setError(
      "Cannot connect to the Django server. Make sure the backend is running."
    );
  }
}finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080B16] text-white flex items-center justify-center px-6">

      {/* Background glow */}
      <div className="fixed -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <Link
          to="/"
          className="block text-center text-3xl font-bold"
        >
          Hire<span className="text-violet-400">Fit</span>
        </Link>

        {/* Login Card */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-2xl backdrop-blur">

          <div className="mb-8">

            <p className="text-sm font-semibold tracking-widest text-violet-400">
              WELCOME BACK
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Sign in to HireFit
            </h1>

            <p className="mt-3 text-gray-400">
              Continue your journey towards the right opportunity.
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Username */}
            <div>

              <label className="mb-2 block text-sm text-gray-300">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Enter your username"
                required
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
              />

            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block text-sm text-gray-300">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
              />

            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-500 py-3.5 font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

          </form>

          {/* Register */}
          <div className="mt-7 border-t border-white/10 pt-6 text-center">

            <p className="text-sm text-gray-500">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="mt-2 inline-block text-sm font-semibold text-violet-400 hover:text-violet-300"
            >
              Create your HireFit account →
            </Link>

          </div>

          {/* Back */}
          <Link
            to="/"
            className="mt-6 block text-center text-sm text-gray-600 hover:text-gray-400"
          >
            ← Back to Home
          </Link>

        </div>

      </div>
    </div>
  );
}