import express from "express";
import bodyParser from "body-parser";
import Posts from "./models/posts.js"

const app = express();
const port = 4000;
const posts = new Posts;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/posts', (req, res) => {
  res.json(posts.all())
})

app.get('/posts/:id', (req,res) => {
  const id = req.params.id
  const post = posts.find(id)

  if (!post) {
    return res.status(404).json({error: 'Post not found: ' + id})
  }

  res.json(post)
})

app.post('/posts', (req,res) => {
  try {
    res.json(posts.new(req.body))
  } catch(error) {
    return res.status(400).json({error: error.message})
  }
})

app.patch('/posts/:id', (req, res) => {
  try {
    res.json(posts.update(req.params.id, req.body))
  } catch(error) {
    return res.status(400).json({error: error.message})
  }
})

app.delete('/posts/:id', (req, res) => {
  try {
    res.json(posts.delete(req.params.id))
  } catch(error) {
    return res.status(404).json({error: error.message})
  }
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
