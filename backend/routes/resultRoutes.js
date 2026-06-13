const express = require("express");

const router = express.Router();

const {
  getOverallRanking,
  getCategoryRanking,
  getDashboardStats,
} = require("../controllers/resultController");

router.get(
  "/overall",
  getOverallRanking
);

router.get(
  "/category/:categoryId",
  getCategoryRanking
);

router.get(
  "/dashboard",
  getDashboardStats
);

module.exports = router;