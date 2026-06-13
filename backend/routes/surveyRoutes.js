const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  submitSurvey,
  hasSubmittedSurvey,
  getMySurvey,
} = require("../controllers/surveyController");

router.post(
  "/submit",
  authMiddleware,
  submitSurvey
);

router.get(
  "/status",
  authMiddleware,
  hasSubmittedSurvey
);

router.get(
  "/my-survey",
  authMiddleware,
  getMySurvey
);
module.exports = router;