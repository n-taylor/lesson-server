const express = require('express')
const app = require('app')

const port = 3000; // nginx routes port 80 request to port 3000

// Route requests using the routes.js file
require('./routes')(app)

app.listen(port, () => { console.log('Listening on port ' + port) })