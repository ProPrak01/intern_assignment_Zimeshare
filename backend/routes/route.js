    const express = require('express');
const router = express.Router();
const productController = require('../controllers/dataControllers');

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProduct);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.post('/bulk-insert', productController.bulkInsertProducts);
router.delete('/delete-all', productController.deleteAllProducts);
module.exports = router;