const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createCandidate,
  getCandidates,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/candidateController");

router.get("/", getCandidates);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createCandidate
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateCandidate
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteCandidate
);

module.exports = router;