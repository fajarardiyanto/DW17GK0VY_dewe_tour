const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const port = 8080;

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use("/Images", express.static("images"));
app.use(bodyParser.urlencoded({ extended: false }));

const router = require("./routes/routers");

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use("/api/v1", router);
