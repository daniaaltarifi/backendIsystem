const express = require('express');
const router = express.Router();
const products = require("../Controller/ProductColorsController")

router.post('/add',products.addColor );


router.put('/edit/:id', products.editColor );


router.delete('/delete/:id', products.deleteColor);

router.get('/getproductdetails' , products.getProductclors)

router.get('/getproductdetails/:id' , products.getProductclorsById)


module.exports = router
