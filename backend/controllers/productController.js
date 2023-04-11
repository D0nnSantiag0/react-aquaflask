const Product = require("../models/product");
const mongoose = require("mongoose");
// const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");


const getProducts = async (req, res, next) => {
  const resPerPage = 4;

  const productsCount = await Product.countDocuments();

  // console.log(productsCount,req.query,Product.find())

  // console.log(Product.find())

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();


  const products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  res.status(200).json({
    success: true,
    productsCount,
    filteredProductsCount,
    resPerPage,
    products,
  });
};

//create new product
const newProduct = async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,

      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  req.body.user = req.user.id;



  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,

    product,
  });
};
// const newProduct = async (req, res, next) => {
//   const requiredFields = [
//     "name",
//     "price",
//     "description",
//     "ratings",
//     "images",
//     "color",
//     "size",
//     "seller",
//     "stock",
//     "numOfReviews",
//     "reviews",
//   ];
//   const emptyFields = requiredFields.filter((field) => !req.body[field]);

//   if (emptyFields.length)
//     return res
//       .status(400)
//       .json({ error: "Please fill all fields", emptyFields });

//   try {
//     const product = await Product.create(req.body);
//     return res.json({ success: true, product });
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// };

const getSingleProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ success: false, message: "Invalid ID" });

  const product = await Product.findById(id);

  if (!product)
    return res.status(404).json({ success: false, message: "Not found" });

  return res.json({ success: true, product });
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,

    count: products.length,

    products,
  });
};

const getAdminProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,

    products,
  });
};

const updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images associated with the product

    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,

        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,

    runValidators: true,

    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,

    product,
  });
};



module.exports = {
  getProducts,
  newProduct,
  getSingleProduct,
  getAdminProducts,
  updateProduct,
 
};
