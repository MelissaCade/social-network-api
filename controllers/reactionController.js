const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");

module.exports = {
  async addReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      ).populate("reactions");
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeReaction(req, res) {},
};
