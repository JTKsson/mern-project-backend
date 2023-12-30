
import express from "express";
import cors from "cors";
import multer from "multer";
import * as authController from "./controllers/auth"; //imports all exports in the file
import * as postsController from "./controllers/posts"
import * as commentsController from "./controllers/comments"
import * as votesController from "./controllers/votes"
import * as imageController from "./controllers/images";
import validateToken from "./middleware/validateToken";

export const app = express();

app.use(cors());
app.use(express.json());

const upload = multer()

app.post("/register", authController.register);
app.post("/login", authController.logIn);
app.get("/profile", validateToken, authController.profile);

app.post("/posts", validateToken, upload.single("image"), postsController.create)
app.get("/posts", postsController.getAllPosts)
app.get("/posts/:id", postsController.getPost) //id för att hämta en specifik post
app.put("/posts/:postId/update", validateToken, postsController.updatePost)
app.delete('/posts/:postId', validateToken, postsController.deletePost);


app.post("/posts/:postId/upvote", validateToken, votesController.upvote)
app.post("/posts/:postId/downvote", validateToken, votesController.downvote)

app.post('/posts/:postId/comments', validateToken, commentsController.createComment);
app.put('/posts/:postId/comments/:commentId', validateToken, commentsController.updateComment);
app.delete('/posts/:postId/comments/:commentId', validateToken, commentsController.deleteComment);

app.get("/images/:id", imageController.getImage)