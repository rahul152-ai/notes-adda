// const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/usersRoute");
const notesRoute = require("./routes/notesRoute");
const commentRoute = require("./routes/commentsRoute");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection sucfessfull!"))
  .catch((err) => console.log(err.message));

app.use("/api", userRoute);

app.use("/api/notes", notesRoute);
app.use("/api", commentRoute);

app.listen(3000, () => {
  console.log("You application is running on port 3000");
});
