const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const multer = require("multer");
const favicon = require("serve-favicon");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "*" }));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("Connection failed:", err.message);
    process.exit(1);
  });

// Static files and favicon
// app.use("/images", express.static("upload/images"));
app.use(favicon(path.join(__dirname, "public", "vite.png")));
app.use(express.static("public"));

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products", // Folder in your Cloudinary dashboard
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: req.file.path, // Cloudinary image URL
  });
});


// Routes
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/productRoutes"));
app.use("/", require("./routes/cartRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});