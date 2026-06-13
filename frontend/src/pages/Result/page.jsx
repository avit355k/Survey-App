import React, { useEffect, useState } from "react";
import axios from "axios";

import { API } from "../../Api/api";
import { showError } from "../../utils/toast";

const Result = () => {
  const [overallRanking, setOverallRanking] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryRankings, setCategoryRankings] = useState({});
  const [dashboard, setDashboard] = useState({});
  const [maxScore, setMaxScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch Overall Ranking
  // ==========================
  const fetchOverallRanking = async () => {
    try {
      const { data } = await axios.get(
        `${API}/results/overall`
      );

      if (data.success) {
        setOverallRanking(data.data || []);
        setMaxScore(data.maxScore || 0);
      }
    } catch (error) {
      showError("Failed to load overall ranking");
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API}/categories`
      );

      setCategories(data || []);

      return data || [];
    } catch (error) {
      showError("Failed to load categories");
      return [];
    }
  };

  // ==========================
  // Fetch Dashboard Stats
  // ==========================
  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get(
        `${API}/results/dashboard`
      );

      if (data.success) {
        setDashboard(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Fetch Category Rankings
  // ==========================
  const fetchCategoryRankings = async (
    categoriesData
  ) => {
    try {
      const rankings = {};

      await Promise.all(
        categoriesData.map(async (category) => {
          const { data } = await axios.get(
            `${API}/results/category/${category.id}`
          );

          if (data.success) {
            rankings[category.id] = data.data;
          }
        })
      );

      setCategoryRankings(rankings);
    } catch (error) {
      showError("Failed to load category rankings");
    }
  };

  // ==========================
  // Initial Load
  // ==========================
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await fetchOverallRanking();

      const categoriesData =
        await fetchCategories();

      await fetchCategoryRankings(
        categoriesData
      );

      await fetchDashboard();

      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 pt-20 md:pt-24 pb-12 px-3 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-base-content/60">
              Live Results
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif mt-2">
              The Leaderboard
            </h1>
          </div>

          <p className="text-base-content/70 text-sm md:text-base">
            Based on{" "}
            <strong>
              {dashboard.totalSurveys || 0}
            </strong>{" "}
            submissions
          </p>
        </div>

        {/* Overall Ranking */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-serif mb-8">
            Overall — out of {maxScore}
          </h2>

          <div className="space-y-4">
            {overallRanking.map(
              (candidate, index) => (
                <div
                  key={candidate.candidate_id}
                  className="rounded-2xl border border-base-300 bg-base-200 p-4 md:p-6"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Candidate */}
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">
                        {index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : index === 2
                          ? "🥉"
                          : "🏅"}
                      </span>

                      <div>
                        <p className="font-medium text-lg md:text-2xl">
                          {
                            candidate.candidate_name
                          }
                        </p>

                        <p className="text-xs opacity-60">
                          Rank #
                          {candidate.rank}
                        </p>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="w-full md:w-auto">
                      <div className="flex items-center justify-between md:justify-end gap-3 mb-2">
                        <span className="font-sans text-2xl md:text-4xl">
                          {candidate.average_marks?.toFixed(
                            2
                          )}
                        </span>

                        <span className="text-sm text-base-content/60">
                          / {maxScore}
                        </span>
                      </div>

                      <progress
                        className="progress progress-primary w-full md:w-72"
                        value={
                          candidate.average_marks
                        }
                        max={maxScore}
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Category Rankings */}
        <section>
          <h2 className="text-2xl md:text-4xl font-serif mb-8">
            By Category — out of 10
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-2xl border border-base-300 bg-base-200 p-5 md:p-7"
              >
                <h3 className="text-xl md:text-3xl font-serif mb-4">
                  {category.name}
                </h3>

                <div className="divider my-0"></div>

                <div className="space-y-4 mt-5">
                  {categoryRankings[
                    category.id
                  ]?.length > 0 ? (
                    categoryRankings[
                      category.id
                    ].map(
                      (
                        candidate,
                        index
                      ) => (
                        <div
                          key={
                            candidate.candidate_id
                          }
                          className="flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span>
                              {index === 0
                                ? "🥇"
                                : index === 1
                                ? "🥈"
                                : index === 2
                                ? "🥉"
                                : "🏅"}
                            </span>

                            <span className="truncate text-sm md:text-lg">
                              {
                                candidate.candidate_name
                              }
                            </span>
                          </div>

                          <span className="font-sans text-lg md:text-2xl whitespace-nowrap">
                            {candidate.average_marks?.toFixed(
                              2
                            )}

                            <span className="text-xs md:text-sm">
                              {" "}
                              /10
                            </span>
                          </span>
                        </div>
                      )
                    )
                  ) : (
                    <div className="text-center py-6 opacity-60">
                      No votes yet
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Result;