const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middleware/error-middleware");
const expressFileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const {checkFolders} = require("./utils/folder-utils");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/media", express.static("media"));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use("/api", router);
app.use(errorMiddleware);
app.use(expressFileUpload());

const start = async () => {
  try {
    checkFolders()
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} and connected to database`
      );
    });
  } catch (e) {
    console.log(e);
  }
};

start();
