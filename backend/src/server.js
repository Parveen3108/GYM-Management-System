const express = require("express");
const cors = require("cors");
require("dotenv").config({
  path: "./backend/.env",
});

const connectDB = require("./config/db");
const memberRoutes = require("./routes/member.route");
const trainerRoutes = require("./routes/trainers.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Gym Management API is running",
  });
});

app.use("/api/members", memberRoutes);
app.use("/api/trainers", trainerRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();