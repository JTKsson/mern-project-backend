import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import * as authController from "./controllers/auth"; //imports all exports in the file
const app = express();

app.use(express.json());

app.post("/register", authController.register);
app.post("login", authController.logIn)

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
