const express = require('express')
const router = express.Router()
const order = require('../models/order.model')
const m = require('../helpers/middlewares')

// Routes
module.exports = router

/* All orders */
router.get('/', async (req, res) => {
    try {
        const orders = await order.getOrders();
        res.json(orders);
    } catch (err) {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    }
})

/* An order by id */
// router.get('/:id', m.mustBeInteger, async (req, res) => {
//     try {
//         const id = req.params.id
//         const order = await order.getOrderById(id);
//         console.log(order);
//         res.json(order);
//     } catch (err) {
//         if (err.status) {
//             res.status(err.status).json({ message: err.message })
//         } else {
//             res.status(500).json({ message: err.message })
//         }
//     }
// })

/* An order by id */
router.get('/:id', m.mustBeInteger, (req, res) => {
    const id = req.params.id
    order.getOrderById(id)
    .then(order => res.json(order))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Create an order */
router.post('/', m.checkFields, async (req, res) => {
    await order.createOrder(req.body)
    .then(post => res.status(201).json({
        message: `The order #${post.id} has been created`,
        content: order
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Orders by type and date*/
router.get('/:type/:date', async (req, res) => {
    try {
        const type = req.params.type
        const date = req.params.date
        const orders = await order.getOrdersByTypeAndDate(type, date)
        res.json(orders)
    } catch (err) {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    }
})