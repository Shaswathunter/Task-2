import express from 'express';
const router = express.Router();
import Product from '../modals/Product.js';
import auth from '../middleware/authMiddleware.js';

// GET /products → View all products (Manager & Store Keeper)
router.get('/', auth(['Manager', 'Store Keeper']), async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST /products → Add new product (Manager & Store Keeper)
router.post('/', auth(['Manager', 'Store Keeper']), async (req, res) => {
  try {
    const { name, category, quantity, price, description } = req.body;
    const newProduct = new Product({ name, category, quantity, price, description });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT /products/:id → Edit product (Manager & Store Keeper)
router.put('/:id', auth(['Manager', 'Store Keeper']), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    const { name, category, quantity, price, description } = req.body;
    product.name = name || product.name;
    product.category = category || product.category;
    product.quantity = quantity || product.quantity;
    product.price = price || product.price;
    product.description = description || product.description;

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE /products/:id → Delete product (Manager & Store Keeper)
router.delete('/:id', auth(['Manager', 'Store Keeper']), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    // Use deleteOne instead of remove
    await Product.deleteOne({ _id: req.params.id });

    res.json({ msg: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).send('Server error');
  }
});


export default router;
