const Users = require("../models/User");

exports.addToCart = async (req, res) => {
  const user = await Users.findById(req.user.id);
  user.cartData[req.body.itemId] += 1;
  await user.save();
  res.json({ message: "Item added to cart" });
};

exports.removeFromCart = async (req, res) => {
  const user = await Users.findById(req.user.id);
  if (user.cartData[req.body.itemId] > 0) user.cartData[req.body.itemId] -= 1;
  await user.save();
  res.json({ message: "Item removed from cart" });
};
