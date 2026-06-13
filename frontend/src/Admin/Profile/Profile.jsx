import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { showSuccess } from "../../utils/toast";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/sign-in");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    showSuccess("Logged out successfully");

    setTimeout(() => {
      navigate("/sign-in");
    }, 1000);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const avatar =
    user.role === "admin"
      ? "https://github.com/evilrabbit.png"
      : "https://github.com/shadcn.png";

  return (
    <div className="min-h-screen bg-base-100 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="uppercase tracking-[0.35em] text-xs opacity-60 mb-2">
            Account
          </p>

          <h1 className="text-4xl md:text-6xl font-serif">
            My Profile
          </h1>
        </div>

        {/* Profile Card */}
        <div className="card bg-base-200 border border-base-300 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={avatar}
                    alt={user.name}
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold">
                  {user.name}
                </h2>

                <p className="text-base-content/70 mt-2">
                  {user.email}
                </p>

                <div className="mt-4">
                  <div
                    className={`badge badge-lg ${
                      user.role === "admin"
                        ? "badge-error"
                        : "badge-primary"
                    }`}
                  >
                    {user.role.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            {/* Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-base-100 rounded-xl p-5 border border-base-300">
                <p className="text-sm opacity-60 mb-1">
                  User Name
                </p>

                <p className="font-semibold text-lg">
                  {user.name}
                </p>
              </div>

              <div className="bg-base-100 rounded-xl p-5 border border-base-300">
                <p className="text-sm opacity-60 mb-1">
                  Email Address
                </p>

                <p className="font-semibold text-lg break-all">
                  {user.email}
                </p>
              </div>

              <div className="bg-base-100 rounded-xl p-5 border border-base-300">
                <p className="text-sm opacity-60 mb-1">
                  Role
                </p>

                <p className="font-semibold text-lg capitalize">
                  {user.role}
                </p>
              </div>

              <div className="bg-base-100 rounded-xl p-5 border border-base-300">
                <p className="text-sm opacity-60 mb-1">
                  Status
                </p>

                <p className="font-semibold text-success">
                  Active
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-3 justify-end mt-8">
              <button
                className="btn btn-outline"
                onClick={() => navigate("/")}
              >
                Back Home
              </button>

              <button
                className="btn btn-error"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Extra Stats */}
        <div className="stats shadow w-full mt-8 border border-base-300 stats-vertical lg:stats-horizontal">
          <div className="stat">
            <div className="stat-title">
              Account Type
            </div>
            <div className="stat-value text-primary text-2xl">
              {user.role}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">
              Survey Access
            </div>
            <div className="stat-value text-success text-2xl">
              Enabled
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">
              Status
            </div>
            <div className="stat-value text-accent text-2xl">
              Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;