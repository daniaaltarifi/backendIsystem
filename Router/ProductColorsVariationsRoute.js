const express = require('express');
const router = express.Router();
const products = require("../Controller/ProductColorsVariationsController")

router.post('/add',products.addProdctVarColor );


router.put('/edit/:id', products.editProdctVarColor);


router.delete('/delete/:id', products.deleteProdctVarColor);

router.get('/getcolorvariations' , products.getProductcolorvariations)

router.get('/getcolorvariations/:id' , products.getProductcolorvariationsById)




module.exports = router