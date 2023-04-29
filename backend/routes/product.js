const express = require("express");

const router = express.Router();

const upload = require("../utils/multer");

const {
  isAuthenticatedUser,authorizeRoles, } = require("../middlewares/auth");

const {
  getProducts,
  newProduct,
  getSingleProduct,
  getAdminProducts,
  updateProduct,
  deleteProduct,
  productSales,
  createProductReview,
} = require("../controllers/productController");

router.route("/products").get(getProducts);

router.route("/product/new").post(newProduct);
router.route("/product/:id").get(getSingleProduct);
router.get("/admin/products", isAuthenticatedUser, getAdminProducts);
router.post("/admin/product/new",isAuthenticatedUser,authorizeRoles("admin"),upload.array("images", 10),newProduct);
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),upload.array("images", 10),updateProduct);
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);
router.route('/admin/products/sales').get(productSales);
router.put("/review", isAuthenticatedUser, createProductReview);

module.exports = router;
