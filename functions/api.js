const express = require("express");
const serverless = require("serverless-http");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/index");

app.use(express.json());
mongoose
  .connect(
    `mongodb+srv://root:123@cluster0.pnvccqv.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Database Connected!"));

app.use(cors());
//Get all students
// router.get("/", (req, res) => {
//   res.send("App is running..");
// });

// //Create new record
// router.post("/add", (req, res) => {
//   res.send("New record added.");
// });

// //delete existing record
// router.delete("/", (req, res) => {
//   res.send("Deleted existing record");
// });

// //updating existing record
// router.put("/", (req, res) => {
//   res.send("Updating existing record");
// });

// //showing demo records
// router.get("/demo", (req, res) => {
//   res.json([
//     {
//       id: "001",
//       name: "Smith",
//       email: "smith@gmail.com",
//     },
//     {
//       id: "002",
//       name: "Sam",
//       email: "sam@gmail.com",
//     },
//     {
//       id: "003",
//       name: "lily",
//       email: "lily@gmail.com",
//     },
//   ]);
// });

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
