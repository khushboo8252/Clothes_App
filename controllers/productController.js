import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

export const addProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ message: 'Product added' });
};

export const updateProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Product updated' });
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};
