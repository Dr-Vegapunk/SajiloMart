const express = require('express');
const { createCategory,updateCategory,deleteCategory,getCategoryById,getCategory } = require('../controllers/category');
const router = express.Router();

// category api
router.get('/category', getCategory);
router.get('/category/:id', getCategoryById);
router.post('/category', createCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);



module.exports = router;