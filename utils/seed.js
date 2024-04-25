const connection = require("../config/connection");
const { User, Thought, Reaction } = require("../models");
const { seedUsers, seedThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }
  await User.insertMany(seedUsers);
  await Thought.insertMany(seedThoughts);

  // console.table(users);
  // console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
