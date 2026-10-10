import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [jobsResponse, profileResponse] =
        await Promise.all([
          axios.get(
            "http://127.0.0.1:8000/api/jobs/",
            config
          ),

          axios.get(
            "http://127.0.0.1:8000/api/student/profile/",
            config
          ),
        ]);

      setJobs(jobsResponse.data);
      setProfile(profileResponse.data);

    } catch (error) {
      console.log("JOBS ERROR:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        window.location.href = "/login";
      } else {
        setError(
          "Unable to load jobs. Make sure Django is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateMatch = (requiredSkills) => {
    if (!profile?.skills || !requiredSkills) {
      return 0;
    }

    const studentSkills = profile.skills
      .toLowerCase()
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const jobSkills = requiredSkills
      .toLowerCase()
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    if (jobSkills.length === 0) {
      return 0;
    }

    const matchedSkills = jobSkills.filter((jobSkill) =>
      studentSkills.some(
        (studentSkill) =>
          studentSkill.includes(jobSkill) ||
          jobSkill.includes(studentSkill)
      )
    );

    return Math.round(
      (matchedSkills.length / jobSkills.length) * 100
    );
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080B16] text-white">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-violet-400" />

          <p className="mt-4 text-gray-400">
            Loading jobs...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B16] text-white">

      {/* Navbar */}

      <nav className="border-b border-white/10 px-6 py-5">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <Link
            to="/dashboard"
            className="text-2xl font-bold"
          >
            Hire<span className="text-violet-400">Fit</span>
          </Link>

          <div className="flex items-center gap-5">

            <Link
              to="/dashboard"
              className="text-sm text-gray-400 hover:text-white"
            >
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="rounded-xl border border-white/10 px-5 py-2 text-sm text-gray-300 hover:bg-white/5"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>

      {/* Main */}

      <main className="mx-auto max-w-7xl px-6 py-12">

        <div>

          <p className="text-sm font-semibold tracking-widest text-violet-400">
            OPPORTUNITIES
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Find your next opportunity
          </h1>

          <p className="mt-3 text-gray-400">
            Explore jobs matched to your skills and career
            goals.
          </p>

        </div>

        {/* Error */}

        {error && (
          <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300">
            {error}
          </div>
        )}

        {/* Jobs */}

        {jobs.length === 0 ? (

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">

            <div className="text-5xl">
              🔎
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              No jobs available
            </h2>

            <p className="mt-3 text-gray-500">
              Recruiters haven't posted any opportunities yet.
            </p>

          </div>

        ) : (

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {jobs.map((job) => {

              const match = calculateMatch(
                job.required_skills
              );

              return (
                <div
                  key={job.id}
                  className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.06]"
                >

                  {/* Top */}

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <span className="rounded-lg bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
                        {job.job_type}
                      </span>

                      <h2 className="mt-4 text-xl font-bold">
                        {job.title}
                      </h2>

                    </div>

                    {/* Match */}

                    <div className="shrink-0 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-center">

                      <p className="text-xl font-bold text-emerald-400">
                        {match}%
                      </p>

                      <p className="text-[9px] tracking-wider text-gray-500">
                        MATCH
                      </p>

                    </div>

                  </div>

                  {/* Job information */}

                  <div className="mt-5 space-y-2 text-sm text-gray-400">

                    <p>
                      📍 {job.location}
                    </p>

                    {job.salary && (
                      <p>
                        💰 {job.salary}
                      </p>
                    )}

                    <p>
                      💼 {job.experience}
                    </p>

                    <p>
                      📅 Deadline: {job.deadline}
                    </p>

                  </div>

                  {/* Description */}

                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-500">
                    {job.description}
                  </p>

                  {/* Skills */}

                  <div className="mt-5">

                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Required Skills
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {job.required_skills
                        ?.split(",")
                        .map((skill) => (

                          <span
                            key={skill}
                            className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-gray-300"
                          >
                            {skill.trim()}
                          </span>

                        ))}

                    </div>

                  </div>

                  {/* Button */}

                  <Link
                    to={`/jobs/${job.id}`}
                    className="mt-6 block w-full rounded-xl bg-violet-500 py-3 text-center text-sm font-semibold transition hover:bg-violet-400"
                  >
                    View Opportunity →
                  </Link>

                </div>
              );
            })}

          </div>

        )}

      </main>

    </div>
  );
}