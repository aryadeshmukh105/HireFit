import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      let url = "";

      let data = {
        username,
        email,
        password,
      };

      if (role === "student") {
        url =
          "http://127.0.0.1:8000/api/register/student/";
      } else {
        url =
          "http://127.0.0.1:8000/api/register/recruiter/";

        data.company_name = companyName;
      }

      await axios.post(url, data);

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.log("REGISTER ERROR:", error);

      if (error.response) {
        if (error.response.data) {
          const data = error.response.data;

          if (typeof data === "object") {
            const messages = Object.values(data)
              .flat()
              .join(" ");

            setError(messages);
          } else {
            setError(String(data));
          }
        } else {
          setError(
            `Registration failed (${error.response.status}).`
          );
        }
      } else {
        setError(
          "Cannot connect to Django server. Make sure the backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080B16] text-white flex items-center justify-center px-6 py-10">

      <div className="fixed -top-40 -right-40 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative w-full max-w-lg">

        {/* Logo */}

        <Link
          to="/"
          className="block text-center text-3xl font-bold"
        >
          Hire<span className="text-violet-400">Fit</span>
        </Link>

        {/* Card */}

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.05] p-8 shadow-2xl backdrop-blur">

          <div className="mb-7">

            <p className="text-sm font-semibold tracking-widest text-violet-400">
              GET STARTED
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Create your account
            </h1>

            <p className="mt-3 text-gray-400">
              Join HireFit and find opportunities that match
              your skills.
            </p>

          </div>

          {/* Role Selection */}

          <div className="mb-6 grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={() => setRole("student")}
              className={`rounded-xl border px-4 py-4 text-left transition ${
                role === "student"
                  ? "border-violet-400 bg-violet-500/10"
                  : "border-white/10 bg-white/[0.02] hover:bg-white/5"
              }`}
            >
              <p className="font-semibold">
                🎓 Student
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Find your next opportunity
              </p>
            </button>

            <button
              type="button"
              onClick={() => setRole("recruiter")}
              className={`rounded-xl border px-4 py-4 text-left transition ${
                role === "recruiter"
                  ? "border-violet-400 bg-violet-500/10"
                  : "border-white/10 bg-white/[0.02] hover:bg-white/5"
              }`}
            >
              <p className="font-semibold">
                🏢 Recruiter
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Find talented candidates
              </p>
            </button>

          </div>

          {/* Messages */}

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              {success}
            </div>
          )}

          {/* Form */}

          <form
            onSubmit={handleRegister}
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
                placeholder="Choose a username"
                required
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
              />

            </div>

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm text-gray-300">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
              />

            </div>

            {/* Company */}

            {role === "recruiter" && (
              <div>

                <label className="mb-2 block text-sm text-gray-300">
                  Company Name
                </label>

                <input
                  type="text"
                  value={companyName}
                  onChange={(e) =>
                    setCompanyName(e.target.value)
                  }
                  placeholder="Enter your company name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
                />

              </div>
            )}

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
                placeholder="Create a password"
                required
                minLength={6}
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-600 outline-none transition focus:border-violet-400 focus:ring-1 focus:ring-violet-400"
              />

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-500 py-3.5 font-semibold transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Create Account →"}
            </button>

          </form>

          {/* Login */}

          <div className="mt-7 border-t border-white/10 pt-6 text-center">

            <p className="text-sm text-gray-500">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="mt-2 inline-block text-sm font-semibold text-violet-400 hover:text-violet-300"
            >
              Sign in to HireFit →
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}