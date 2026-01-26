import { PASSWORD } from '../index.js'

const authorization = (req, res, next) => {
    if (req.session.authorized == true) {
        return next()
    }

    if (req.body['password'] == PASSWORD) {
        req.session.authorized = true
    } else {
        req.session.authorized = false
    }

    next()
}

export default authorization