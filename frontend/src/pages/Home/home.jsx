import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Users,
  BarChart3,
} from "lucide-react";

const Home = () => {
  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      {/* Hero */}
      <section className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <p className="uppercase tracking-[0.4em] text-xs text-base-content/60 mb-8">
          Volume 01 • Student Evaluation Platform
        </p>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl leading-none font-light">
              Mark them
              <br />
              <span className="italic font-serif text-primary">
                wisely.
              </span>
              <br />
              Rank them
              <br />
              <span className="italic font-serif text-primary">
                together.
              </span>
            </h1>

            <p className="mt-10 text-lg leading-9 text-base-content/70 max-w-2xl">
              Score each teacher, faculty member, or candidate
              out of ten in every subject. We average every
              student voice into a transparent leaderboard,
              refreshed in real time.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/survey">
                <button className="btn btn-primary btn-lg">
                  Take the Survey
                  <ArrowRight size={18} />
                </button>
              </Link>

              <Link to="/results">
                <button className="btn btn-outline btn-lg">
                  View Rankings
                </button>
              </Link>
            </div>
          </div>

          {/* Right Stats */}
          <div className="lg:border-l border-base-300 lg:pl-12 space-y-12">
            <div>
              <h3 className="text-5xl font-light">/10</h3>
              <p className="mt-2 text-base-content/70">
                Marks per subject, per participant.
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-light">/40</h3>
              <p className="mt-2 text-base-content/70">
                Total score averaged across four disciplines.
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-light">∞</h3>
              <p className="mt-2 text-base-content/70">
                Unlimited responses with one vote each.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 lg:px-12 py-24 border-t border-base-300">
        <div className="max-w-3xl mb-14">
          <h2 className="text-5xl font-light mb-6">
            Every score tells a story.
          </h2>

          <p className="text-lg text-base-content/70 leading-8">
            Built for colleges, universities, and organizations
            that need meaningful feedback through a simple
            marks-based evaluation process.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <Award className="w-10 h-10 text-primary" />

              <h3 className="card-title text-xl">
                Fair Evaluation
              </h3>

              <p className="text-base-content/70">
                Rate candidates consistently using a simple
                marks-based approach.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <BarChart3 className="w-10 h-10 text-primary" />

              <h3 className="card-title text-xl">
                Live Rankings
              </h3>

              <p className="text-base-content/70">
                Automatically calculate averages and display
                transparent leaderboards.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300">
            <div className="card-body">
              <Users className="w-10 h-10 text-primary" />

              <h3 className="card-title text-xl">
                Collective Voice
              </h3>

              <p className="text-base-content/70">
                Gather opinions from hundreds of students and
                combine them into meaningful insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-6 lg:px-12 py-24">
        <div className="bg-base-200 rounded-3xl p-10 lg:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Ready to collect meaningful feedback?
          </h2>

          <p className="max-w-2xl mx-auto text-base-content/70 text-lg mb-8">
            Launch your survey, gather responses, and discover
            insights that help make better decisions.
          </p>

   
            <button className="btn btn-primary btn-lg">
              Create a Survey
            </button>

        </div>
      </section>
    </main>
  );
};

export default Home;