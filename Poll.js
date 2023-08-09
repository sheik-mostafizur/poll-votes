const {Schema, model} = require("mongoose");

const pollSchema = new Schema({
  title: {
    type: "string",
    required: true,
    trim: true,
  },
  description: {
    type: "string",
    required: true,
    trim: true,
  },
  totalVote: {type: Number, default: 0},
  options: {
    type: [
      {
        name: String,
        voteCount: Number,
      },
    ],
  },
});

const Poll = model("Poll", pollSchema);

module.exports = Poll;
