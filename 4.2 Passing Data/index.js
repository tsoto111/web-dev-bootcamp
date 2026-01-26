import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let indexTitle = 'Enter your name below 👇'

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('index.ejs', {title: indexTitle})
});

app.post("/submit", (req, res) => {
  res.render('index.ejs', { title: `There are ${req.body.fName.length + req.body.lName.length} letters in your name.`})
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
