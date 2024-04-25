const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");

module.exports = {
  async getUsers(req, res) {},
  async getSingleUser(req, res) {},
  async createUser(req, res) {},
  async updateUser(req, res) {},
  async deleteUser(req, res) {},
  async addFriend(req, res) {},
  async deleteFriend(req, res) {},
};
