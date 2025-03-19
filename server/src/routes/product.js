const express = require('express');
const { createProduct,getProduct,getProductById,updateProduct,deleteProduct } = require('../controllers/product');
const router = express.Router();

// product creation
router.get('/product', getProduct);
router.get('/product/:id', getProductById);


router.post('/product', createProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);


module.exports = router;