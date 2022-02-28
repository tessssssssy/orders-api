function mustBeInteger(req, res, next) {
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

function checkFields(req, res, next) {
    const { title, type, customer } = req.body
    if (title && type && customer) {
        next()
    } else {
        res.status(400).json({ message: 'fields missing' })
    }
}

module.exports = {
    mustBeInteger,
    checkFields
}