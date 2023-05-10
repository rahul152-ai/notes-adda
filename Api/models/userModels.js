const { Schema, model } = require("mongoose");
const notes = require("../models/notesModel");

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model("User", UserSchema);
module.exports = User;
