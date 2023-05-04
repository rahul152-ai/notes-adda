const { Schema, model } = require("mongoose");

const NoteSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String },
  pdf: { type: String },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Notes = model("Note", NoteSchema);
module.exports = Notes;
