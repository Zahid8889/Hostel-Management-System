const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('./db');
const cookieParser = require('cookie-parser');
mongoose();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    ); 
    next();
});
app.use(express.json())
app.use(cookieParser())

app.use('/api', require('./Routes/student.route.js'))
// app.use('/api', require('./Routes/adminroute'))
app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})