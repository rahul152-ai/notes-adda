const express = require("express");
const router = express.Router();
const Notes = require("../models/notesModel");
const auth = require("./auth");
const multer = require("multer");
const path = require("path");
const { log } = require("console");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Check for PDF file

const fileFilter = function (req, file, cb) {
  try {
    const allowedFileTypes = ["application/pdf"];

    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      return cb("Invalid file type. Only PDF files are allowed.");
    }
  } catch (err) {
    console.log(err);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

//Create Notes route

router.post("/createNotes", auth, upload.single("file"), async (req, res) => {
  const { content, title, description } = req.body;
  if (!title || !description) {
    return res.status(404).json("Please Provide all the reqired filed");
  }
  var notes;
  try {
    notes = content
      ? {
          title,
          description,
          content,
          created_by: req.body._id,
        }
      : {
          title,
          description,
          content,
          created_by: req.body._id,
          pdf: req.file.filename,
        };

    const newnotes = await Notes.create(notes);
    // console.log(newnotes);
    if (newnotes) {
      return res.status(202).json("You Notes has Been Successfully Uploaded");
    } else {
      return res.status(404).json("Faild to Create the Notes");
    }
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});

// single notes route

router.get("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // const notes = await Notes.findById(id);
    const notes = await Notes.findById(id)
      // .populate("comments", "comment")
      .populate({
        path: "comments",
        select: "comment",
        populate: { path: "created_by", select: "username" },
      })
      .exec();

    if (!notes) {
      return res.status(404).json({ message: "Notes not found" });
    }

    let data = {
      title: notes.title,
      description: notes.description,
      content: notes.content,
      created_by: notes.created_by,
      comments: notes.comments,
      pdf: null,
    };

    // If notes has a PDF file, attach the file to the response
    if (notes.pdf) {
      const file = path.join(__dirname, "../uploads", notes.pdf);
      console.log(file);
      data.pdf = file;
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// retrive pdf

router.get("/retrive/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const notes = await Notes.findById(id);

    if (!notes) {
      return res.status(404).json({ message: "Pdf  not found" });
    }

    let data = {
      pdf: null,
    };

    let hasPdf = false;

    // If notes has a PDF file, attach the file to the response
    if (notes.pdf) {
      const file = path.join(__dirname, "../uploads", notes.pdf);
      data.pdf = file;
      hasPdf = true;
    }

    // Send either a JSON or file response based on whether a PDF file was found
    if (hasPdf) {
      try {
        await new Promise((resolve, reject) => {
          res.setHeader("Content-Disposition", "attachment");
          return res.sendFile(data.pdf, (err) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve();
            }
          });
        });
        console.log("File downloaded successfully");

        // return res.status(200).json(data);
        // console.log("now sending other data");
      } catch (err) {
        return res.status(500).json({ message: "Error downloading file" });
      }
    }
    // return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Get all notes of user by user id;

router.get("/usernotes/:id", auth, async (req, res) => {
  try {
    const user_id = req.params.id;
    // const notes = await Notes.find
    const notes = Notes.find({ created_by: user_id });
    if (!notes) {
      return res.json({
        status: "sucess",
        message: "You do not have any note frist create notes",
      });
    }
    var NotesArray = [];
    (await notes).forEach((item, index) => {
      NotesArray[index] = item;
    });
    return res.json(NotesArray);
  } catch (error) {
    return res.json({ status: "error", message: error.message });
  }
});
//route to get all notes
router.get("/getAllNotes", auth, async (req, res) => {
  try {
    const notes = Notes.find();
    var homeAllNotes = [];
    (await notes).forEach((element, index) => {
      homeAllNotes[index] = element;
    });
    return res.json(homeAllNotes);
  } catch (error) {
    return res.json({ status: "success", message: error.message });
  }
});

//get not by search
router.get("/search", auth, async (req, res) => {
  try {
    var searchTerm = req.query.search;
    // // searchTerm = "_math";
    // console.log(req.query);
    // console.log(searchTerm);
    const notes = await Notes.find({
      title: { $regex: searchTerm, $options: "i" },
    });
    // db.notes.createIndex({ title: "text", description: "text" })
    if (!notes) {
      return res.json({
        status: "Data_not_found",
        message: "Notes with search Not found",
      });
    }

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
