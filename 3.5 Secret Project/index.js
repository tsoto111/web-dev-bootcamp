import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import authorization from './middleware/authorization.js'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

export const PASSWORD = 'ILoveProgramming'

app.use(authorization)

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/secrets', (req, res) => {
    if (!req.session.authorized) {
        return res.render('index.ejs', { flashMessage: { type: 'errorMessage', message: 'Please Login'} })
    }

    res.render('secrets.ejs')
})

app.post('/check', (req, res) => {
    if (!req.session.authorized) {
        return res.render('index.ejs', { flashMessage: { type: 'errorMessage', message: 'Incorrect password.' } })
    }

    res.redirect('/secrets')
})

app.post('/logout', (req, res) => {
    req.session.authorized = false

    res.render('index.ejs', { flashMessage: { type: 'successMessage', message: 'You have been logged out.'} })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})