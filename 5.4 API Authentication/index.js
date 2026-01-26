import express from "express";
import SecretsApi from "./services/secrets-api.js";

const app = express();
const port = 3000;
const secretsApi = new SecretsApi(
  "SuhDuh111",
  "password123",
  "65c590da-536d-4c91-9792-1eaf35f8d68c",
  "e8a227ad-7221-4b49-972f-6f06006acb8d"
)

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await secretsApi.getRandom()
    res.render("index.ejs", { content: JSON.stringify(response) })
  } catch(error) {
    res.render("index.ejs", { content: error.message})
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await secretsApi.getAll()
    res.render("index.ejs", { content: JSON.stringify(response)})
  } catch(error) {
    res.render("index.ejs", { content: error.message })
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await secretsApi.getSecretsWithFilter(5)
    res.render("index.ejs", {content: JSON.stringify(response)})
  } catch (error) {
    res.render("index.ejs", { content: error.message })
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await secretsApi.getSecretById(42)
    res.render("index.ejs", {content: JSON.stringify(response)})
  } catch(error) {
    res.render("index.ejs", { content: error.message })
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
