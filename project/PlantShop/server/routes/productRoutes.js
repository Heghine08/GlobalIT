const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  recordSales,
} = require("../controllers/productController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

router.get("/", getProducts);
router.post("/sales", recordSales);

router.post(
  "/",
  auth,
  isAdmin,
  createProduct
);

router.put(
  "/:id",
  auth,
  isAdmin,
  updateProduct
);

router.delete(
  "/:id",
  auth,
  isAdmin,
  deleteProduct
);

module.exports = router;