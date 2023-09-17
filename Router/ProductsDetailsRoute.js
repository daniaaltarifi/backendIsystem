const express = require('express');
const router = express.Router();
const products = require("../Controller/ProductsDetailsController")

router.post('/add',products.addProductDetails );


router.put('/edit/:id', products.editProductDetails );


router.delete('/delete/:id', products.deleteProductDetails );

router.get('/getproductdetails' , products.getProductDetails)
router.get('/getproductdetails/:id' , products.getProductDetailsById)

router.get('/getproductdetailsimac' , products.getProductDetailsImacById)

router.get('/getproductdetailsiphone' , products.getProductDetailsIphoneById)

router.get('/getproductdetailsipad' , products.getProductDetailsIpadById)

router.get('/getproductdetailswatch' , products.getProductDetailsWatchById)

router.get('/getproductdetailsaudio' , products.getProductDetailsAudioById)

router.get('/getproductdetailsappletv' , products.getProductDetailsAppleTvById)

router.get('/getproductdetailsaccessories' , products.getProductDetailsAccessoriesTvById)

module.exports = router
