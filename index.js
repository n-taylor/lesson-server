const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3000; // nginx routes port 80 request to port 3000

// Route requests using the routes.js file
require('./routes')(app)



app.listen(port, () => { console.log('Listening on port ' + port) })