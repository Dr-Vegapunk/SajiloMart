const express = require('express');
const { registerUser,loginUser,getAllUsers,updateUser,deleteUser } = require('../controllers/user');
const router = express.Router();

// User registration
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers); 
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;