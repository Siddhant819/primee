import express from 'express';
import Product from '../models/Product.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { pickFields } from '../utils/sanitize.js';

const router = express.Router();

// Allowed fields for product creation and updates
const PRODUCT_FIELDS = ['name', 'description', 'price', 'category', 'image', 'stock', 'isActive'];

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    let query = { isActive: true };

    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .skip(skip)
      .limit(Number(limit))
      .populate('createdBy', 'name email');

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get product by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('createdBy', 'name email');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Create product (admin only)
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const product = new Product({
      name: name.trim(),
      description: description.trim(),
      price,
      category: category.trim(),
      image,
      stock,
      createdBy: req.userId
    });

    await product.save();
    await product.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update product (admin only — whitelisted fields)
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Only allow whitelisted fields — prevents mass assignment
    const updateData = pickFields(req.body, PRODUCT_FIELDS);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    res.json({ success: true, message: 'Product updated', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete product (admin only)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;