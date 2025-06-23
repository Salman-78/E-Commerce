const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  const products = await Product.find({});
  const id = products.length ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();
  res.json({ success: true, name: req.body.name });
};

exports.removeProduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.send(products);
};

exports.getNewCollection = async (req, res) => {
  const products = await Product.find({});
  const latest = products.slice(-8);
  res.send(latest);
};

exports.getPopularInWomen = async (req, res) => {
  const products = await Product.find({});
  res.send(products.slice(0, 4));
};
