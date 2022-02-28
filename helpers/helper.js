const fs = require('fs');

const getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

const newDate = () => new Date().toISOString().split("T")[0];

// lookup id
function checkId(array, id) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        if (!row) {
            reject({
                message: 'not found',
                status: 404
            })
        }
        resolve(row)
    })
}

// lookup type and date
function filterOrders(array, type, date) {
    return new Promise((resolve, reject) => {
        const filteredArray = array.filter((row) => { return row.type === type && row.date.split('-').join('') === date});
        if (filteredArray.length === 0) {
            reject({
                message: "No orders found",
                status: 404
            })
        }

        let data = { 
            type: type,
            count: 0,
            orders: [],
            related_customers: []
        };

        filteredArray.forEach((order) => {
            data.count++
            data.orders.unshift(order.id);
            if (data.orders.length > 10) {
                data.orders.pop();
            }
            if (!data.related_customers.includes(order.customer)) {
                data.related_customers.push(order.customer);
            }
        })
        resolve(data)
    })
}

function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = {
    getNewId,
    newDate,
    checkId,
    filterOrders,
    writeJSONFile
}