const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// CORS CONFIG
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "https://chodnewalaaashik.vercel.app"   // live frontend
];

app.use(
  cors({
    origin: function (origin, callback) {

      // Allow mobile apps, Postman, curl (no origin)
      if (!origin) return callback(null, true);

      // Check allowed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // If not allowed
      console.log(" CORS BLOCKED:", origin);
      return callback(new Error("Not allowed by CORS"));
    },

    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/candidates", require("./routes/candidateRoutes"));

app.use("/api/categories", require("./routes/categoryRoutes"));

app.use("/api/survey", require("./routes/surveyRoutes"));

app.use("/api/results", require("./routes/resultRoutes"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});