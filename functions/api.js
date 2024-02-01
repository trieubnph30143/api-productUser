const express = require("express");
const serverless = require("serverless-http");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/index");

app.use(express.json());
mongoose
  .connect(
    `mongodb+srv://root:123@cluster0.mni0h8u.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Database Connected!"));

app.use(cors());

app.use("/.netlify/functions/api", router);
app.listen(3000, () => {
  console.log(`Server on 3000 ${3000}`);
});
module.exports.handler = serverless(app);
