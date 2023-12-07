import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import User from "./models/User";

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = new User({userName: username, password})
  await user.save()

  res.send({username, id: user._id})
});

const mongoURL = process.env.DB_URL;
if (!mongoURL) throw Error("Missing DB URL");

mongoose
  .connect(mongoURL) //vilken sorts databas, vem som loggar in, vart den existerar sen vad db heter  "mongodb://root:example@localhost:27017/changedit"
  .then(() => {
    const port = parseInt(process.env.PORT || "3000");
    app.listen(port, () => {
      console.log(`Server listen on port ${port}`);
    });
  });
