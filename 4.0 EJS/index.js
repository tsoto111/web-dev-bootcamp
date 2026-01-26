import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));

import rootRoute from './routes/rootRoute.js'
app.use('/', rootRoute)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
