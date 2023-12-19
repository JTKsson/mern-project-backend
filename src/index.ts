import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import * as authController from "./controllers/auth"; //imports all exports in the file
import * as postsController from "./controllers/posts"
import * as commentsController from "./controllers/comments"
import * as votesController from "./controllers/votes"
import validateToken from "./middleware/validateToken";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", authController.register);
app.post("/login", authController.logIn);
app.get("/profile", validateToken, authController.profile);

app.post("/posts", validateToken, postsController.create)
app.get("/posts", postsController.getAllPosts)
app.get("/posts/:id", postsController.getPost) //id för att hämta en specifik post

app.post("/posts/:postId/upvote", validateToken, votesController.upvote)
app.post("/posts/:postId/downvote", validateToken, votesController.downvote)

app.post('/posts/:postId/comments', validateToken, commentsController.createComment);
app.delete('/posts/:postId/comments/:commentId', validateToken, commentsController.deleteComment);

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
