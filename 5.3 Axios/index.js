import express from "express";
import bodyParser from "body-parser";
import BoredApi from "./services/bored_api.js";

const app = express();
const port = 3000;
const boredApiService = new BoredApi();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await boredApiService.getRandom();
    res.render("index.ejs", { data: response })
  } catch(error) {
    res.render("index.ejs", {
      error: error.message
    })
  }
});

app.post("/", async (req, res) => {
  try {
    const response = await boredApiService.getRandomFilter(req.body?.type, req.body?.participants)
    res.render("index.ejs", { data: response })
  } catch(error) {
    res.render("index.ejs", {
      error: error.message
    })
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
