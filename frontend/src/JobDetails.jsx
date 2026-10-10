import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/jobs/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("JOB DETAILS:", response.data);

      setJob(response.data);
    } catch (err) {
      console.log("JOB DETAILS ERROR:", err);

      if (err.response) {
        console.log("STATUS:", err.response.status);
        console.log("DATA:", err.response.data);
      }

      setError("Unable to load this opportunity.");
    } finally {
      setLoading(false);
    }
  };

  const applyJob = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    setApplying(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/applications/",
        {
          job: job.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Application submitted successfully!");
    } catch (err) {
      console.log("APPLICATION ERROR:", err);

      if (err.response?.status === 400) {
        setError("You have already applied for this job.");
      } else {
        setError("Unable to submit application.");
      }
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080B16] text-white flex items-center justify-center">
        <p className="text-gray-400">
          Loading opportunity...
        </p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#080B16] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Opportunity not found
          </h1>

          <p className="mt-3 text-gray-400">
            {error}
          </p>

          <Link
            to="/jobs"
            className="mt-6 inline-block rounded-xl bg-violet-500 px-6 py-3 font-semibold"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B16] text-white">

      <nav className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <Link
            to="/dashboard"
            className="text-2xl font-bold"
          >
            Hire<span className="text-violet-400">Fit</span>
          </Link>

          <Link
            to="/jobs"
            className="text-gray-400 hover:text-white"
          >
            ← Back to Jobs
          </Link>

        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-6 py-12">

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

          <span className="rounded-lg bg-violet-500/10 px-3 py-1.5 text-sm text-violet-300">
            {job.job_type}
          </span>

          <h1 className="mt-5 text-4xl font-bold">
            {job.title}
          </h1>

          <p className="mt-4 text-gray-400">
            📍 {job.location}
          </p>

        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-3">

          <div className="md:col-span-2">

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

              <h2 className="text-2xl font-bold">
                About the Job
              </h2>

              <p className="mt-5 whitespace-pre-line leading-8 text-gray-400">
                {job.description}
              </p>

              <h2 className="mt-10 text-2xl font-bold">
                Required Skills
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">

                {job.required_skills
                  ?.split(",")
                  .map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
                    >
                      {skill.trim()}
                    </span>
                  ))}

              </div>

            </div>

          </div>

          <div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">

              <h2 className="text-xl font-bold">
                Job Information
              </h2>

              <div className="mt-6 space-y-5">

                <div>
                  <p className="text-xs text-gray-500">
                    LOCATION
                  </p>
                  <p className="mt-1">
                    {job.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    EXPERIENCE
                  </p>
                  <p className="mt-1">
                    {job.experience}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    SALARY
                  </p>
                  <p className="mt-1">
                    {job.salary || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    DEADLINE
                  </p>
                  <p className="mt-1">
                    {job.deadline}
                  </p>
                </div>

              </div>

              {success && (
                <div className="mt-6 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  {success}
                </div>
              )}

              {error && (
                <div className="mt-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <button
                onClick={applyJob}
                disabled={applying || !!success}
                className="mt-6 w-full rounded-xl bg-violet-500 py-3.5 font-semibold hover:bg-violet-400 disabled:opacity-50"
              >
                {applying
                  ? "Applying..."
                  : success
                  ? "Applied ✓"
                  : "Apply Now →"}
              </button>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}