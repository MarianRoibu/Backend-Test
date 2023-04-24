// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');
// const { authMiddleware } = require('../middleware/auth');

// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.headers['user-id'];
//     const products = await Product.find({ userId: userId });
//     res.send(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error del servidor');
//   }
// });

// module.exports = router;
