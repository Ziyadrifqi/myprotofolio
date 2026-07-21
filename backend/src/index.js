require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
const profileRoutes = require("./routes/profile");
const stackRoutes = require("./routes/stack");
const projectsRoutes = require("./routes/projects");
const experienceRoutes = require("./routes/experience");
const navLinksRoutes = require("./routes/navLinks");
const portfolioRoutes = require("./routes/portfolio");

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000").split(",");

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/stack", stackRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/nav-links", navLinksRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.use((req, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`);
});