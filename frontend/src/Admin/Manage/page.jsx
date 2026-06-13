import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";

import { API } from "../../Api/api";
import { showSuccess, showError } from "../../utils/toast";

const Manage = () => {
  const [candidate, setCandidate] = useState("");
  const [category, setCategory] = useState("");

  const [candidates, setCandidates] = useState([]);
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  // Fetch Candidates
  const fetchCandidates = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/candidates`
      );

      setCandidates(data || []);
    } catch (error) {
      showError("Failed to load candidates");
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/categories`
      );

      setCategories(data || []);
    } catch (error) {
      showError("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchCategories();
  }, []);

  // Add Candidate
  const addCandidate = async () => {
    if (!candidate.trim()) {
      return showError("Candidate name is required");
    }

    try {
      await axios.post(
        `${API}/api/candidates`,
        {
          name: candidate,
          image_url: null,
        },
        axiosConfig
      );

      showSuccess("Candidate added successfully");

      setCandidate("");

      fetchCandidates();
    } catch (error) {
      showError(
        error.response?.data?.message ||
        "Failed to add candidate"
      );
    }
  };


  // Add Category
  const addCategory = async () => {
    if (!category.trim()) {
      return showError("Category name is required");
    }

    try {
      await axios.post(
        `${API}/api/categories`,
        {
          name: category,
          max_marks: 10,
        },
        axiosConfig
      );

      showSuccess("Category added successfully");

      setCategory("");

      fetchCategories();
    } catch (error) {
      showError(
        error.response?.data?.message ||
        "Failed to add category"
      );
    }
  };

  // Delete Candidate
  const deleteCandidate = async (id) => {
    if (!window.confirm("Delete candidate?")) return;

    try {
      await axios.delete(
        `${API}/api/candidates/${id}`,
        axiosConfig
      );

      showSuccess("Candidate deleted");

      fetchCandidates();
    } catch (error) {
      showError(
        error.response?.data?.message ||
        "Failed to delete candidate"
      );
    }
  };

  // Delete Category
  const deleteCategory = async (id) => {
    if (!window.confirm("Delete category?")) return;

    try {
      await axios.delete(
        `${API}/api/categories/${id}`,
        axiosConfig
      );

      showSuccess("Category deleted");

      fetchCategories();
    } catch (error) {
      showError(
        error.response?.data?.message ||
        "Failed to delete category"
      );
    }
  };

  // Edit Candidate
  const editCandidate = async (item) => {
    const newName = prompt(
      "Edit candidate name",
      item.name
    );

    if (!newName || newName === item.name) return;

    try {
      await axios.put(
        `${API}/api/candidates/${item.id}`,
        {
          name: newName,
        },
        axiosConfig
      );

      showSuccess("Candidate updated");

      fetchCandidates();
    } catch (error) {
      showError(
        error.response?.data?.message ||
        "Failed to update candidate"
      );
    }
  };

  // Edit Category
  const editCategory = async (item) => {
    const newName = prompt(
      "Edit category name",
      item.name
    );

    if (!newName || newName === item.name) return;

    try {
      await axios.put(
        `${API}/api/categories/${item.id}`,
        {
          name: newName,
          max_marks: 10,
        },
        axiosConfig
      );

      showSuccess("Category updated");

      fetchCategories();
    } catch (error) {
      showError(
        error.response?.data?.message ||
        "Failed to update category"
      );
    }
  };

  return (
    <div className="min-h-screen bg-base-100 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="uppercase tracking-[0.35em] text-xs opacity-60 mb-2">
              Admin
            </p>

            <h1 className="text-4xl md:text-6xl font-serif">
              Manage the survey
            </h1>
          </div>

          <button className="link text-sm hidden md:block">
            Sign out
          </button>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Candidates */}
          <div>
            <h2 className="text-2xl font-serif mb-6">
              Candidates
            </h2>

            <div className="flex gap-2 mb-5">
              <input
                type="text"
                value={candidate}
                onChange={(e) =>
                  setCandidate(e.target.value)
                }
                placeholder="Candidate name"
                className="input input-bordered flex-1"
              />

              <button
                onClick={addCandidate}
                className="btn btn-primary px-6"
              >
                Add
              </button>
            </div>

            <div className="border border-base-300 rounded-xl overflow-hidden">
              {candidates.length === 0 ? (
                <div className="p-5 text-center opacity-60">
                  No candidates found
                </div>
              ) : (
                candidates.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-5 py-4 border-b border-base-300 last:border-b-0"
                  >
                    <span className="font-medium">
                      {item.name}
                    </span>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          editCandidate(item)
                        }
                        className="text-sm hover:text-primary flex items-center gap-1"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteCandidate(item.id)
                        }
                        className="text-error text-sm flex items-center gap-1"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-2xl font-serif mb-6">
              Categories
            </h2>

            <div className="flex gap-2 mb-5">
              <input
                type="text"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                placeholder="Category name"
                className="input input-bordered flex-1"
              />

              <button
                onClick={addCategory}
                className="btn btn-primary px-6"
              >
                Add
              </button>
            </div>

            <div className="border border-base-300 rounded-xl overflow-hidden">
              {categories.length === 0 ? (
                <div className="p-5 text-center opacity-60">
                  No categories found
                </div>
              ) : (
                categories.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-5 py-4 border-b border-base-300 last:border-b-0"
                  >
                    <span className="font-medium">
                      {item.name}
                    </span>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          editCategory(item)
                        }
                        className="text-sm hover:text-primary flex items-center gap-1"
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteCategory(item.id)
                        }
                        className="text-error text-sm flex items-center gap-1"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sign Out */}
        <div className="mt-8 text-center md:hidden">
          <button className="link">Sign out</button>
        </div>
      </div>
    </div>
  );
};

export default Manage;