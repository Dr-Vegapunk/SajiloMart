const express = require('express');
const { createProduct,getProduct,getProductById,updateProduct,deleteProduct } = require('../controllers/product');
const router = express.Router();

// product creation
router.get('/products', getProduct);
router.get('/products/:id', getProductById);


router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);


module.exports = router;