import express from 'express'
import bodyParser from 'body-parser'
// import morgan from 'morgan'
import logger from './middleware/custom_logger.js'

const app = express()
const port = 3000

app.set('view engine', 'ejs');

// app.use(morgan(":remote-addr - :remote-user [:date[clf]] :method :url HTTP/:http-version :status :res[content-length]"))
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger)

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post("/submit", (req, res) => {
    res.render('results.ejs', {bandName: `${req.body['street-name']} ${req.body['pet-name']}`})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})