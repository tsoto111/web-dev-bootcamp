import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import SecretsApi from "./services/secrets-api.js";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const secretsApi = new SecretsApi("e396ed0f-52eb-4f3d-9acf-108da84fe39e")
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  
  try {
    const result = await secretsApi.getSecretById(searchId)
    res.render("index.ejs", { content: JSON.stringify(result) })
  } catch(error) {
    res.render("index.ejs", { content: JSON.stringify(error.message) })
  }
});

app.post("/post-secret", async (req, res) => {
  const secret = req.body.secret
  const score = req.body.score

  try {
    const result = await secretsApi.postSecret(secret, score)
    res.render("index.ejs", { content: JSON.stringify(result)})
  } catch(error) {
    res.render("index.ejs", { content: JSON.stringify(error.message) })
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  const secret = req.body.secret
  const score = req.body.score

  try {
    const result = await secretsApi.putSecret(searchId, secret, score)
    res.render("index.ejs", { content: JSON.stringify(result)})
  } catch(error) {
    res.render("index.ejs", { content: JSON.stringify(error.message) })
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  const secret = req.body.secret
  const score = req.body.score

  try {
    const result = await secretsApi.patchSecret(searchId, secret, score)
    res.render("index.ejs", { content: JSON.stringify(result)})
  } catch(error) {
    res.render("index.ejs", { content: JSON.stringify(error.message) })
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  
  try {
    const result = await secretsApi.deleteSecretById(searchId)
    res.render("index.ejs", { content: JSON.stringify(result)})
  } catch(error) {
    res.render("index.ejs", { content: JSON.stringify(error.message) })
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
