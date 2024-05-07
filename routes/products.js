/* 
  Faihd Enrique Pineda Duque
  Juan David Robayo Torres
*/

const express = require('express');
const router = express.Router();

const data = [
  {id: 1, nombre: 'Zapatos A', valor: 19.3, enStock: true, createdOn: new Date()},
  {id: 2, nombre: 'Zapatos B', valor: 206.3, enStock: false, createdOn: new Date()},
  {id: 3, nombre: 'Zapatos C', valor: 56.0, enStock: true, createdOn: new Date()},
  {id: 4, nombre: 'Zapatos D', valor: 63.8, enStock: true, createdOn: new Date()},
  {id: 5, nombre: 'Zapatos E', valor: 39.4, enStock: false, createdOn: new Date()},
];

// GEt method that gets all products with state code 200 and JSON of products
router.get('/', function (req, res) {
  res.status(200).json(data);
});

// Send product with specific ID with the GET method and with 202 state code, more the JSON of product
router.get('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

// Create new product wiht POST Method with state code 201, more the JSON of the new product
router.post('/', function (req, res) {
  let itemIds = data.map(item => item.id);
  let orderNums = data.map(item => item.order);

  let newItem = {
    id: itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1,
    nombre: req.body.nombre,
    valor: req.body.valor,
    enStock: false,
    createdOn: new Date()
  };

  data.push(newItem);

  res.status(201).json(newItem);
});

//Update product by ID with the PUT method with state code 204, more the JSON of updating product
// if not find product, respond with a 404 state code
router.put('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    let updated = {
      id: parseInt(req.params.id),
      nombre: req.body.nombre,
      valor: req.body.valor,
      enStock: req.body.enStock
    };

    let targetIndex = data.indexOf(found);
    data.splice(targetIndex, 1, updated);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

// Delete product by UD with the DELETE method with a 204 state code
// If not find product, respond with a 404 state code
router.delete('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    let targetIndex = data.indexOf(found);

    data.splice(targetIndex, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;