const express = require('express')
const router = express.Router()
module.exports = router

router.use('/orders', require('./order.routes'));