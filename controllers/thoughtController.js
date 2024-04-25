const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");

module.exports = {
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).populate("reactions");
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID." });
      }
      return res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //STILL NEED TO : push the created thought's ID to the associated User's "Thoughts" array
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      ).populate("reactions");
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID." });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID." });
      }
      res.status(200).json({ message: "Thought succesfully deleted." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
