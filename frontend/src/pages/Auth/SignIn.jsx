import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../../Api/api";
import axios from "axios";

import { showSuccess, showError } from "../../utils/toast";

const SignIn = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      return showError("All fields are required");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      showSuccess(
        response.data.message ||
        "Signed in successfully!"
      );

      setTimeout(() => {
        navigate("/profile");
      }, 1200);
    } catch (err) {
      showError(
        err.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-base-100 md:bg-base-200">
      <div className="card w-full max-w-md bg-base-100 md:border md:border-base-300 md:rounded-2xl md:shadow-xl">
        <div className="card-body">
          <h2 className="text-3xl italic font-serif text-center">
            Sign In to
          </h2>

          {/* Logo */}
          <div className="flex justify-center mb-4 mt-2">
            <img
              src="/cda.png"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Email Address
                </span>
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email..."
                className="input input-bordered w-full"
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Password
                </span>
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password..."
                className="input input-bordered w-full"
              />
            </div>

            {/* Remember Me */}
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="label-text">
                Remember me
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Sign Up */}
          <div className="text-center mt-4">
            <p className="text-sm text-base-content/70">
              Don't have an account?
            </p>

            <Link
              to="/sign-up"
              className="btn btn-outline btn-primary w-full mt-3"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;