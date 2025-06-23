const Users = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  let existing = await Users.findOne({ email: req.body.email });
  if (existing) return res.status(200).json({ success: false, error: "User already exists" });

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const token = jwt.sign({ user: { id: user.id } }, "secret_ecom");
  res.json({ success: true, token });
};

exports.login = async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (!user) return res.json({ success: false, error: "Invalid email" });

  if (user.password !== req.body.password)
    return res.json({ success: false, error: "Wrong password" });

  const token = jwt.sign({ user: { id: user.id } }, "secret_ecom");
  res.json({ success: true, token });
};

exports.getCart = async (req, res) => {
  const user = await Users.findById(req.user.id);
  res.json(user.cartData);
};
