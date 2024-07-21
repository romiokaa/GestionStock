// const pool = require('../config/db');

// // Récupérer tous les produits
// exports.getAllProducts = async (req, res) => {
//   try {
//     const [products] = await pool.query('SELECT * FROM products');
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
//   }
// };

// // Récupérer un produit par ID
// exports.getProductById = async (req, res) => {
//   const productId = req.params.id;
//   try {
//     const [product] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
//     if (product.length === 0) {
//       return res.status(404).json({ error: 'Produit non trouvé' });
//     }
//     res.json(product[0]);
//   } catch (error) {
//     res.status(500).json({ error: 'Erreur lors de la récupération du produit' });
//   }
// };

// // Créer un nouveau produit (nécessite une authentification)
// exports.createProduct = async (req, res) => {
//   const { name, description, price, category, image } = req.body;
//   // ... (logique pour créer le produit dans la base de données)
// };

// // Mettre à jour un produit (nécessite une authentification)
// exports.updateProduct = async (req, res) => {
//   const productId = req.params.id;
//   const { name, description, price, category, image } = req.body;
//   // ... (logique pour mettre à jour le produit dans la base de données)
// };

// // Supprimer un produit (nécessite une authentification)
// exports.deleteProduct = async (req, res) => {
//   const productId = req.params.id;
//   // ... (logique pour supprimer le produit de la base de données)
// };
