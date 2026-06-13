import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../../Api/api";
import axios from "axios";

import { showSuccess, showError } from "../../utils/toast";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return showError("All fields are required");
    }

    if (formData.password !== formData.confirmPassword) {
      return showError("Passwords do not match");
    }

    try {
      await axios.post(`${API}/auth/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      showSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch (err) {
      showError(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:px-4 py-10 bg-base-100 md:bg-base-200">
      <div className="card w-full max-w-md bg-base-100 md:border md:border-base-300 md:rounded-2xl">
        <div className="card-body">
          <h2 className="text-3xl italic font-sans text-center">
            Sign Up to
          </h2>

          {/* Logo */}
          <div className="flex justify-center mb-2">
            <img
              src="/cda.png"
              alt="Logo"
              className="h-8 w-auto object-contain"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label mb-1">
                <span>Full Name</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name..."
                className="input input-bordered w-full"
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label mb-1">
                <span>Email Address</span>
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
              <label className="label mb-1">
                <span>Password</span>
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password..."
                className="input input-bordered w-full"
              />
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label mb-1">
                <span>Confirm Password</span>
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password..."
                className="input input-bordered w-full"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
            >
              Create Account
            </button>
          </form>

          {/* Sign In */}
          <div className="text-center mt-4">
            <Link
              to="/sign-in"
              className="link link-primary"
            >
              I Already Have an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;