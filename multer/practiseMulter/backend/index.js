const express = require("express");
const app = express();
const multer = require("multer");
const bodyparser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT;
app.use(cors());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "photos/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpg") {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only .jpg files are allowed"), false); // Reject the file
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
app.post("/upload", upload.single("file"), (req, res) => {
  res.send("your file successfully upload");
});
app.listen(port, () => {
  console.log("server is listing");
});
