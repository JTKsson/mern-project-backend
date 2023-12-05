import express from "express";

const app = express();

app.use("/", (req, res) => {
  console.log("Root route hit");

  res.send("Henlo frens");
});

app.listen(3000, () => {
  console.log("Server listen on port 3000");
});
