/* 
  Faihd Enrique Pineda Duque
  Juan David Robayo Torres
*/
const http = require('http');
const express = require('express');
const productos = require('./routes/products.js');
const app = express();

app.use(express.json());

app.use('/products', productos)

app.use('/', function(req, res) {
  res.send('Its Working!!');
})

const server = http.createServer(app);
const port = 3001;
server.listen(port);
console.debug(`Server run in port: ${port}`);