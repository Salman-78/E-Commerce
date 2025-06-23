const express = require("express");
const router = express.Router();
const {
  addProduct,
  removeProduct,
  getAllProducts,
  getNewCollection,
  getPopularInWomen,
} = require("../controllers/productController");

router.post("/addproduct", addProduct);
router.post("/removeproduct", removeProduct);
router.get("/allproducts", getAllProducts);
router.get("/newcollections", getNewCollection);
router.get("/popularinwomen", getPopularInWomen);

module.exports = router;
