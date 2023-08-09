exports.createPollGet = (req, res) => {
  res.render("create-poll");
};

exports.createPollPost = (_req, res) => {
  res.json({message: "Created poll successfully"});
};

exports.viewSinglePoll = (_req, res) => {
  res.render("view-single-poll");
};

exports.viewPolls = (_req, res) => {
  res.render("view-polls");
};
