const express = require("express");
const cors = require("cors");

const artistRoutes = require("./routes/artistRoutes");
const songRoutes = require("./routes/songRoutes");
const albumRoutes = require("./routes/albumRoutes");

const app = express();
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json());

app.use("/api/artists", artistRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
