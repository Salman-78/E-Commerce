const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const { addToCart, removeFromCart } = require("../controllers/cartController");

router.post("/addtocart", fetchUser, addToCart);
router.post("/removefromcart", fetchUser, removeFromCart);

module.exports = router;
