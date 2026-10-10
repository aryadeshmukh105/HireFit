import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [jobsResponse, applicationsResponse, profileResponse] =
        await Promise.all([
          axios.get(
            "http://127.0.0.1:8000/api/jobs/",
            config
          ),

          axios.get(
            "http://127.0.0.1:8000/api/applications/my/",
            config
          ),

          axios.get(
            "http://127.0.0.1:8000/api/student/profile/",
            config
          ),
        ]);

      setJobs(jobsResponse.data);
      setApplications(applicationsResponse.data);
      setProfile(profileResponse.data);

    } catch (error) {
      console.log("DASHBOARD ERROR:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        window.location.href = "/login";
      } else {
        setError(
          "Unable to load dashboard data. Make sure the Django server is running."
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

  const getProfileCompletion = () => {
    if (!profile) {
      return 0;
    }

    const fields = [
      profile.phone,
      profile.college,
      profile.degree,
      profile.graduation_year,
      profile.skills,
    ];

    const completed = fields.filter(
      (field) =>
        field !== null &&
        field !== undefined &&
        String(field).trim() !== ""
    ).length;

    return Math.round((completed / fields.length) * 100);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/";
  };

  const recommendedJobs = [...jobs]
    .map((job) => ({
      ...job,
      match: calculateMatch(job.required_skills),
    }))
    .sort((a, b) => b.match - a.match)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080B16] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-violet-400" />

          <p className="mt-4 text-gray-400">
            Loading your dashboard...
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
            to="/"
            className="text-2xl font-bold"
          >
            Hire<span className="text-violet-400">Fit</span>
          </Link>

          <button
            onClick={logout}
            className="rounded-xl border border-white/10 px-5 py-2 text-sm text-gray-300 hover:bg-white/5"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* Main */}

      <main className="mx-auto max-w-7xl px-6 py-12">

        <p className="text-sm font-semibold tracking-widest text-violet-400">
          STUDENT DASHBOARD
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Welcome back 👋
        </h1>

        <p className="mt-3 text-gray-400">
          Discover opportunities that match your skills.
        </p>

        {/* Error */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300">
            {error}
          </div>
        )}

        {/* Stats */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">

            <p className="text-gray-400">
              Available Jobs
            </p>

            <p className="mt-3 text-4xl font-bold">
              {jobs.length}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Opportunities available
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">

            <p className="text-gray-400">
              My Applications
            </p>

            <p className="mt-3 text-4xl font-bold">
              {applications.length}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Applications submitted
            </p>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">

            <p className="text-gray-400">
              Profile Completion
            </p>

            <p className="mt-3 text-4xl font-bold text-emerald-400">
              {getProfileCompletion()}%
            </p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">

              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{
                  width: `${getProfileCompletion()}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* Recommended Jobs */}

        <section className="mt-12">

          <div className="flex items-end justify-between">

            <div>
              <p className="text-sm font-semibold tracking-widest text-violet-400">
                RECOMMENDED FOR YOU
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Best skill matches
              </h2>
            </div>

          </div>

          {recommendedJobs.length === 0 ? (

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">

              <p className="text-gray-400">
                No jobs available yet.
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Recruiters will add opportunities here.
              </p>

            </div>

          ) : (

            <div className="mt-6 grid gap-6 md:grid-cols-3">

              {recommendedJobs.map((job) => (

                <div
                  key={job.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-violet-400/30"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {job.job_type}
                      </p>

                      <h3 className="mt-2 text-xl font-bold">
                        {job.title}
                      </h3>

                    </div>

                    <div className="shrink-0 rounded-xl bg-emerald-400/10 px-3 py-2 text-center">

                      <p className="text-xl font-bold text-emerald-400">
                        {job.match}%
                      </p>

                      <p className="text-[10px] text-gray-500">
                        MATCH
                      </p>

                    </div>

                  </div>

                  <p className="mt-4 text-sm text-gray-400">
                    📍 {job.location}
                  </p>

                  {job.salary && (
                    <p className="mt-2 text-sm text-gray-400">
                      💰 {job.salary}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap gap-2">

                    {job.required_skills
                      ?.split(",")
                      .slice(0, 4)
                      .map((skill) => (

                        <span
                          key={skill}
                          className="rounded-lg bg-violet-500/10 px-3 py-1.5 text-xs text-violet-300"
                        >
                          {skill.trim()}
                        </span>

                      ))}

                  </div>

                  <button className="mt-6 w-full rounded-xl bg-violet-500 py-3 text-sm font-semibold hover:bg-violet-400">
                    View Opportunity →
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* Applications */}

        <section className="mt-12">

          <p className="text-sm font-semibold tracking-widest text-violet-400">
            APPLICATIONS
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Recent applications
          </h2>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04]">

            {applications.length === 0 ? (

              <div className="p-8 text-center">

                <p className="text-gray-400">
                  You haven't applied to any jobs yet.
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Your applications will appear here.
                </p>

              </div>

            ) : (

              <div className="divide-y divide-white/10">

                {applications.slice(0, 5).map((application) => (

                  <div
                    key={application.id}
                    className="flex items-center justify-between gap-4 p-6"
                  >

                    <div>

                      <p className="font-semibold">
                        Job #{application.job}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Applied on{" "}
                        {new Date(
                          application.applied_at
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                      {application.status}
                    </span>

                  </div>

                ))}

              </div>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}