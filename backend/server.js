const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chodnewalaaashik.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/candidates", require("./routes/candidateRoutes"));

app.use("/api/categories", require("./routes/categoryRoutes"));

app.use("/api/survey", require("./routes/surveyRoutes"));

app.use("/api/results", require("./routes/resultRoutes"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});