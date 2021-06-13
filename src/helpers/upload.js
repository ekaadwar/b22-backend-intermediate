const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "assets", "images"));
  },
  filename: function (req, file, cb) {
    cb(null, "1.jpg");
  },
});

module.exports = multer({ storage });
