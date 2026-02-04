// HINTS:
import express from "express";
import SecretsApi from "./services/secrets-api.js";

const app = express();
const port = 3000;

const secretsApi = new SecretsApi("e396ed0f-52eb-4f3d-9acf-108da84fe39e")
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await secretsApi.getRandom();
        res.render("index.ejs", {secret: result.secret, user: result.username});
    } catch(error) {
        res.render("index.ejs", {secret: error.message, user: 'Error'});
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});