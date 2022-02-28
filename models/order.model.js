const file = '../data/orders.json';

let orders = require(file);

const helper = require('../helpers/helper.js')

const getOrders = () => {
    return new Promise((resolve, reject) => {
        if (orders.length === 0) {
            reject({message: "No orders"})
        } else {
            resolve(orders);
        }
    })
}

const getOrderById = (id) => {
    return new Promise((resolve, reject) => {
        helper.checkId(orders, id)
        .then(order => resolve(order))
        .catch(err => reject(err))
    })
}

function createOrder(newOrder) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(orders) }
        const date = helper.newDate();
        newOrder = { ...id, ...date, ...newOrder }
        posts.push(newPost)
        helper.writeJSONFile(filename, posts)
        resolve(newPost)
    })
}

const getOrdersByTypeAndDate = (type, date) => {
    return new Promise((resolve, reject) => {
        helper.filterOrders(orders, type, date)
        .then(orders => resolve(orders))
        .catch(err => reject(err))
    })
}

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    getOrdersByTypeAndDate
}