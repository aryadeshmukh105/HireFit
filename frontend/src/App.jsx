import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Register from "./Register";
import Jobs from "./Jobs";
import JobDetails from "./JobDetails";


function Home() {
  return (
    <div className="min-h-screen bg-[#080B16] text-white">

      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <Link to="/" className="text-2xl font-bold">
            Hire<span className="text-violet-400">Fit</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/login"
              className="rounded-xl bg-violet-500 px-5 py-2.5 font-semibold hover:bg-violet-400"
            >
              Get Started
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.3em] text-violet-400">
              CAREER MATCHING PLATFORM
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Your skills.
              <br />
              Your next{" "}
              <span className="text-violet-400">
                opportunity.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
              HireFit connects students with job opportunities
              based on their skills, interests and career goals.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/login"
                className="rounded-xl bg-violet-500 px-7 py-3.5 font-semibold hover:bg-violet-400"
              >
                Find Your Fit →
              </Link>

              <a
                href="#how"
                className="rounded-xl border border-white/10 px-7 py-3.5 font-semibold text-gray-300 hover:bg-white/5"
              >
                How It Works
              </a>

            </div>
          </div>

          {/* Match Card */}
          <div className="relative">

            <div className="absolute -inset-10 rounded-full bg-violet-600/10 blur-3xl" />

            <div className="relative rounded-3xl border border-white/10 bg-white/[0.05] p-7 shadow-2xl">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    RECOMMENDED FOR YOU
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Junior React Developer
                  </h2>
                </div>

                <div className="rounded-2xl bg-emerald-400/10 px-4 py-3 text-center">
                  <p className="text-2xl font-bold text-emerald-400">
                    92%
                  </p>
                  <p className="text-xs text-gray-400">
                    Match
                  </p>
                </div>
              </div>

              <p className="mt-5 text-gray-400">
                TechNova Solutions · Pune
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["React", "JavaScript", "HTML", "CSS", "Git"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-violet-500/10 px-3 py-2 text-sm text-violet-300"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>

              <div className="mt-7">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-400">
                    Skill compatibility
                  </span>

                  <span className="font-semibold text-emerald-400">
                    92%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[92%] rounded-full bg-violet-500" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-8 text-center md:grid-cols-3">

          <div>
            <p className="text-4xl font-bold">500+</p>
            <p className="mt-2 text-gray-500">
              Opportunities
            </p>
          </div>

          <div>
            <p className="text-4xl font-bold text-violet-400">
              90%
            </p>
            <p className="mt-2 text-gray-500">
              Skill-based matching
            </p>
          </div>

          <div>
            <p className="text-4xl font-bold">24/7</p>
            <p className="mt-2 text-gray-500">
              Career access
            </p>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-violet-400">
              HOW HIREFIT WORKS
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              From skills to opportunity.
            </h2>

            <p className="mt-4 text-gray-400">
              A simple platform designed to help students
              discover relevant career opportunities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="text-4xl">01</div>

              <h3 className="mt-6 text-xl font-bold">
                Build Your Profile
              </h3>

              <p className="mt-3 text-gray-400">
                Add your education, skills and professional
                information to create your career profile.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="text-4xl">02</div>

              <h3 className="mt-6 text-xl font-bold">
                Discover Jobs
              </h3>

              <p className="mt-3 text-gray-400">
                Explore opportunities and see how well your
                skills match the requirements.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <div className="text-4xl">03</div>

              <h3 className="mt-6 text-xl font-bold">
                Apply & Track
              </h3>

              <p className="mt-3 text-gray-400">
                Apply to suitable jobs and keep track of your
                applications from one dashboard.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl border border-violet-500/20 bg-violet-500/10 p-10 text-center">

          <h2 className="text-3xl font-bold">
            Ready to find your fit?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-400">
            Create your HireFit account and start exploring
            opportunities matched to your skills.
          </p>

          <Link
            to="/login"
            className="mt-7 inline-block rounded-xl bg-violet-500 px-7 py-3.5 font-semibold hover:bg-violet-400"
          >
            Get Started →
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <p className="font-bold">
            Hire<span className="text-violet-400">Fit</span>
          </p>

          <p className="text-sm text-gray-500">
            Find the Right Fit. Build the Right Career.
          </p>

        </div>
      </footer>

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/register" element={<Register />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/jobs/:id" element={<JobDetails />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;