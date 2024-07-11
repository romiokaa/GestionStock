const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Middleware d'authentification (à implémenter)
const authenticate = (req, res, next) => {
  // Vérifier le token JWT et extraire l'ID de l'utilisateur
  // ...
  next(); // Passer au contrôleur suivant si authentifié
};

// Routes publiques
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Routes protégées (nécessitent une authentification)
router.post('/', authenticate, productController.createProduct);
router.put('/:id', authenticate, productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;
