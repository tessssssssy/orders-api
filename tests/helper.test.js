const helper = require('../helpers/helper.js')

// new date
test('newDate returns a date as a string', () => {
    expect(helper.newDate()).toMatch(/^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/);
  });

// check id
const arr = [ {
    id: 1,
    title: "new mobile order",
    date : "2020-09-22",
    type : "iPhone13",
    customer : "customer-1"
},
{
    id: 2,
    title: "new laptop",
    date: "2021-05-26",
    type: "macbook",
    customer: "customer-2"
},
{
    id: 3,
    title: "new phone",
    date: "2020-08-16",
    type: "iphone12",
    customer: "customer-3"
},
{
    id: "4",
    title: "bluetooth headphones",
    date: "2020-09-22",
    type: "airpods",
    customer: "customer-1"
}
]

test('checkId resolves to return correct row of data', () => {
    return expect(helper.checkId(arr, 1)).resolves.toEqual({"customer": "customer-1", "date": "2020-09-22", "id": 1, "title": "new mobile order", "type": "iPhone13"});
  });

test('checkId rejects with error message', () => {
    return expect(helper.checkId(arr, 5)).rejects.toEqual({message: "not found", status: 404});
});

// filter orders

test('filterOrders resolves to return correct data', () => {
    return expect(helper.filterOrders(arr, "iPhone13", "20200922")).resolves.toEqual({"type":"iPhone13","count":1,"orders":[1],"related_customers":["customer-1"]});
  });

test('filterOrders rejects with error message', () => {
    return expect(helper.filterOrders(arr, "macbook", "20200423")).rejects.toEqual({message: "No orders found", status: 404});
});
