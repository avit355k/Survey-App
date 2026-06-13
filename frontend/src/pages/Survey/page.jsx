import React, { useState, useEffect } from "react";
import axios from "axios";

import { API } from "../../Api/api";
import { showSuccess, showError } from "../../utils/toast";


const Survey = () => {
  const [candidates, setCandidates] = useState([]);
  const [categories, setCategories] = useState([]);

  const [ratings, setRatings] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

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

      setCandidates(data);
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

      setCategories(data);
    } catch (error) {
      showError("Failed to load categories");
    }
  };
  // Check Survey Status
  const checkSurveyStatus = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/survey/status`,
        axiosConfig
      );

      if (data.submitted) {
        setSubmitted(true);
        fetchMySurvey();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get Submitted Survey
  const fetchMySurvey = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/survey/my-survey`,
        axiosConfig
      );

      const marksMap = {};

      data.ratings.forEach((item) => {
        marksMap[
          `${item.candidate_id}_${item.category_id}`
        ] = item.marks;
      });

      setRatings(marksMap);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchCandidates(),
        fetchCategories(),
      ]);

      if (token && user?.role === "user") {
        await checkSurveyStatus();
      }

      setLoading(false);
    };

    loadData();
  }, []);

  // Handle Marks Change
  const handleMarkChange = (
    candidateId,
    categoryId,
    value
  ) => {
    if (submitted) return;

    let mark = Number(value);

    if (mark > 10) mark = 10;
    if (mark < 0) mark = 0;

    setRatings((prev) => ({
      ...prev,
      [`${candidateId}_${categoryId}`]: mark,
    }));
  };

  // Submit Survey
  const handleSubmit = async () => {
    try {
      const payload = [];

      candidates.forEach((candidate) => {
        categories.forEach((category) => {
          payload.push({
            candidate_id: candidate.id,
            category_id: category.id,
            marks:
              ratings[
              `${candidate.id}_${category.id}`
              ] || 0,
          });
        });
      });

      const { data } = await axios.post(
        `${API}/api/survey/submit`,
        {
          ratings: payload,
        },
        axiosConfig
      );

      showSuccess(
        data.message ||
        "Survey submitted successfully"
      );

      setSubmitted(true);
    } catch (error) {
      showError(
        error.response?.data?.message ||
        "Failed to submit survey"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-base-100 pt-24 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-6xl font-serif">
            Cast your marks
          </h1>

          <p className="mt-4 text-base-content/70 text-lg">
            Score every candidate from 0 to 10 in each category.
          </p>
        </div>

        {/* Table Card */}
        <div className="card bg-base-200 border border-base-300 shadow-sm">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-base md:text-lg">
                    <th>Candidate</th>

                    {categories.map((category) => (
                      <th key={category.id}>{category.name}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate}>
                      <td className="font-bold text-lg">
                        {candidate.name}
                      </td>

                      {categories.map((category) => (
                        <td key={category.id}>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            placeholder="0-10"
                            disabled={
                              submitted ||
                              user?.role !== "user"
                            }
                            value={
                              ratings[
                              `${candidate.id}_${category.id}`
                              ] ?? ""
                            }
                            onChange={(e) =>
                              handleMarkChange(
                                candidate.id,
                                category.id,
                                e.target.value
                              )
                            }
                            className="input input-bordered w-20 md:w-24"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {user?.role === "user" && (
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className="btn btn-primary btn-lg"
            >
              {submitted
                ? "Survey Submitted"
                : "Submit"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Survey;