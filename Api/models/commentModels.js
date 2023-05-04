const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  comment: { type: String, required: true },
  note_id: { type: Schema.Types.ObjectId, ref: "Note", required: true },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
