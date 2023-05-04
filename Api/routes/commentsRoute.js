const express = require("express");
const Comment = require("../models/commentModels");
const Notes = require("../models/notesModel");
const router = express.Router();

router.post("/comment", async (req, res) => {
  const { comment, note_id, user_id } = req.body;
  // console.log(comment, note_id, user_id);
  if (!comment) {
    return res.json({ status: "error", message: "Comment is required!" });
  }

  try {
    const newcomment = {
      comment,
      note_id,
      created_by: user_id,
    };
    const createdComment = await Comment.create(newcomment);
    if (createdComment) {
      const updateCommentArray = await Notes.findByIdAndUpdate(
        note_id,
        { $push: { comments: createdComment._id } },
        { new: true }
      );
      // console.log(updateCommentArray);
      return res
        .status(202)
        .json("Your comment has been successfully uploaded");
    } else {
      return res.status(404).json("Failed to create the comment");
    }
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});

router.get("/getcomments", async (req, res) => {
  const id = req.body._id;
  try {
    const comment = await Comment.findById(id);
    if (comment) {
      return res.json({ status: "202", comment: comment });
    }
  } catch (error) {
    return res.json({ status: "404", error: error.message });
  }
});

module.exports = router;
