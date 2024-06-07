const Product = require('../models/model');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProduct = async (req, res) => {
    const query = req.query.q;
    if (query.length >= 2) {
      try {
        const results = await Product.find({
          name: new RegExp(query, 'i')
        });
        res.json(results);
      } catch (error) {
        res.status(500).json({ message: 'Error searching products', error });
      }
    } else {
      res.json([]);
    }
};

exports.createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
        brand: req.body.brand,
        inStock: req.body.inStock,
        details: req.body.details,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }

        Object.assign(product, req.body);
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }

        await product.remove();
        res.json({ message: 'Deleted Product' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.bulkInsertProducts = async (req, res) => {
    try {
      const products = req.body;
      const insertedProducts = await Product.insertMany(products);
      res.status(201).json(insertedProducts);
    } catch (error) {
      res.status(400).json({ message: 'Error inserting products', error });
    }
  };