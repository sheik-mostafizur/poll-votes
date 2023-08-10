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

  if (!title || !description || !options || options.length < 2) {
    return res.render("create-poll", {
      message: "Please provide the correct values.",
    });
  }
  const poll = new Poll({title, description, options});
  try {
    await poll.save();

    const polls = await Poll.find();
    console.log(polls);
    res.render("view-polls", {polls, title: "View Polls | Poll Votes"});
  } catch (error) {
    console.log(error);
    return res.render("create-poll", {
      message: "Something is wring!",
    });
  }
};

exports.viewSinglePoll = async (req, res) => {
  const id = req.params.id;
  const poll = await Poll.findById(id);

  res.render("view-single-poll", {title: poll.title, poll});
};

exports.viewPolls = async (_req, res) => {
  const polls = await Poll.find();
  if (!polls) {
    return res.render("view-polls", {
      title: "Polls Not Available | Poll Votes",
    });
  }
  res.render("view-polls", {polls, title: "View Polls | Poll Votes"});
};

exports.votePoll = async (req, res) => {
  const id = req.params.id;
  const optionId = req.body.optionId;

  const poll = await Poll.findById(id);
  const options = poll.options.map((opt) => {
    if (opt.id === optionId) {
      opt.voteCount = opt.voteCount + 1;
    }
    return opt;
  });
  const totalVote = poll.totalVote + 1;

  await Poll.findOneAndUpdate({_id: poll.id}, {$set: {options, totalVote}});

  const polls = await Poll.find();

  res.render("view-polls", {polls, title: "View Polls | Poll Votes"});
};
