// Import packages
const express = require('express');

// App
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))

app.get('/', (req, res) => {
    console.log(res.status);
    res.json({ message: 'Home' })
});

// Starting server
app.listen('3000')