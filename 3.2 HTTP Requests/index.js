import express from 'express'

const app = express()
const port = 3001

app.get('/', (request, response) => {
    response.send('Hello World')
})

app.get('/about', (request, response) => {
    response.send(
        '<h1>About Me</h1>' +
        '<p>My name is Tavo.</p>'
    )
})

app.get('/contact', (request, response) => {
    response.send(
        '<h1>Contact Me</h1>' +
        '<p>Phone: (918) 555-5555</p>'
    )
})

app.listen(port, () => {
    console.log(`I am running on port ${port}.`)
})