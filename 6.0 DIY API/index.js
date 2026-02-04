import express from "express";
import bodyParser from "body-parser";
import Jokes from "./models/jokes.js";

const app = express();
const port = 3000;
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";
const jokesModel = new Jokes;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/random", (req, res) => {
  res.json(jokesModel.random());
})

app.get("/jokes/:id", (req, res) => {
  res.json(jokesModel.find(req.params.id))
})

app.get("/filter", (req, res) => {
  res.json(jokesModel.allByType(req.query.type))
})

app.post("/jokes", (req, res) => {
  res.json(jokesModel.new(req.body))
})

app.put("/jokes/:id", (req, res) => {
  try {
    res.json(jokesModel.put(req.params.id, req.body))
  } catch(error) {
    return res.status(400).json({error: error.message})
  }
})

app.patch("/jokes/:id", (req, res) => {
  res.json(jokesModel.update(req.params.id, req.body))
})

app.delete("/jokes/:id", (req, res) => {
  try {
    res.json(jokesModel.delete(req.params.id))
  } catch(error) {
    return res.status(404).json({error: error.message})
  }
})


app.delete("/all", (req, res) => {
  if (req.query.key !== masterKey) {
    return res.status(401).json({error: 'Authorization failed.'})
  }

  jokesModel.deleteAll()
  return res.status(200).json({message: 'All jokes deleted!'})
})

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
