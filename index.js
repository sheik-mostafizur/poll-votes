require("dotenv").config();
const mongodb = require("./config/mongodbConnect");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;

// Import pollControllers from pollControllers
const {
  createPollGet,
  createPollPost,
  viewPolls,
  viewSinglePoll,
  votePoll,
} = require("./pollController");

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/create-poll", createPollGet);
app.post("/create-poll", createPollPost);

app.get("/view-polls/:id", viewSinglePoll);
app.get("/view-polls", viewPolls);

app.post("/vote/:id", votePoll);

app.get("/", (_req, res) => {
  res.render("index", {title: "Home | Poll Votes"});
});

mongodb()
  .then(() => {
    console.log("connected");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
