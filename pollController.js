const Poll = require("./Poll");

exports.createPollGet = (_req, res) => {
  res.render("create-poll", {title: "Create A New Poll | Poll Votes"});
};

exports.createPollPost = async (req, res) => {
  let {title, description, options} = req.body;

  if (options.includes("")) {
    return res.render("create-poll", {
      message: "Please provide the options values.",
    });
  }

  options = options.map((opt) => {
    return {name: opt, voteCount: 0};
  });

  if (!title || !description || !options) {
    return res.render("create-poll", {
      message: "Please provide the correct values.",
    });
  }
  const poll = new Poll({title, description, options});
  try {
    await poll.save();
    res.redirect("/view-polls", {title: "View Polls | Poll Votes"});
  } catch (error) {
    console.log(error);
    return res.render("create-poll", {
      message: "Something is wring!",
    });
  }
};

exports.viewSinglePoll = (_req, res) => {
  res.render("view-single-poll");
};

exports.viewPolls = (_req, res) => {
  res.render("view-polls", {title: "View Polls | Poll Votes"});
};
