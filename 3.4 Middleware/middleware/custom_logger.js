function logger(req, _, next) {
    console.log('Request Method: ' + req.method)
    console.log('Request URL: ' + req.url)
    next()
}

export default logger