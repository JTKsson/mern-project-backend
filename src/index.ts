import "dotenv/config";
import mongoose from "mongoose";
import { app } from "./app";


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
