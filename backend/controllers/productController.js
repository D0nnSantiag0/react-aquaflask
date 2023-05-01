const Product = require("../models/product");
const mongoose = require("mongoose");
const APIFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");
const Order = require('../models/order')


// const getProducts = async (req, res, next) => {
//   // const products = await Product.find();
//   const productsCount = await Product.countDocuments();
//   const apiFeatures = new APIFeatures(Product.find(), req.query)
//     .search()
//     .filter();

//   const products = await apiFeatures.query;
//   let filteredProductsCount = products.length;

//   res.status(200).json({
//     success: true,
//     filteredProductsCount,
//     productsCount,
//     products,
//   });
// };
// const getProducts = async (req, res, next) => {
//   // const products = await Product.find();
//   const productsCount = await Product.countDocuments();
//   const apiFeatures = new APIFeatures(Product.find(), req.query)
//     .search()
//     .filter();

//   const products = await apiFeatures.query;
//   let filteredProductsCount = products.length;

//   res.status(200).json({
//     success: true,
//     filteredProductsCount,
//     productsCount,
//     products,
//   });
// };
// const getProducts = async (req, res, next) => {
//   const apiFeatures = new APIFeatures(Product.find(), req.query)
//     .search().filter();

//   const products = await apiFeatures.query;
//   const productsCount = products.length;

//   res.status(200).json({
//     success: true,
//     productsCount,
//     products,
//   });
// };
// const getProducts = async (req, res, next) => {
//   const apiFeatures = new APIFeatures(Product.find(), req.query);

//   if (req.query.keyword) {
//     apiFeatures.search();
//   } 
//   if (req.query.color) {
//     apiFeatures.filter();
//   }
//   if (req.query.size) {
//     apiFeatures.filter();
//   }
//   const products = await apiFeatures.query;
//   const productsCount = products.length;

//   res.status(200).json({
//     success: true,
//     productsCount,
//     products,
//   });

//   if (!req.query.keyword && !req.query.color && !req.query.size) {
//     // if no filters are applied, return all products
//     const allProducts = await Product.find();
//     res.status(200).json({
//       success: true,
//       productsCount: allProducts.length,
//       products: allProducts,
//     });
//   }
// };

//UPDATE HERE
const getProducts = async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.find(), req.query);

  if (req.query.keyword) {
    apiFeatures.search();
  }

  if (req.query.color) {
    apiFeatures.filter();
  }

  if (req.query.size) {
    apiFeatures.filter();
  }

  if (!req.query.keyword && !req.query.color && !req.query.size) {
    // if no filters or search criteria are specified, return all products
    const allProducts = await Product.find();
    res.status(200).json({
      success: true,
      productsCount: allProducts.length,
      products: allProducts,
    });
  } else {
    const products = await apiFeatures.query;
    const productsCount = products.length;
    res.status(200).json({
      success: true,
      productsCount,
      products,
    });
  }
};






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


const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ success: false, message: "Invalid ID" });

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  res.status(200).json({ success: true, message: "Product deleted" });
};


const productSales = async (req, res, next) => {
  const totalSales = await Order.aggregate([
      {
          $group: {
              _id: null,
              total: { $sum: "$itemsPrice" }

          },
      },
  ])
  const sales = await Order.aggregate([
      { $project: { _id: 0, "orderItems": 1, totalPrice: 1 } },
      { $unwind: "$orderItems" },
      {
          $group: {
              // _id: {month: { $month: "$paidAt" } },
              _id: { product: "$orderItems.name" },
              // total: {$sum: {$multiply: [ "$orderItemsprice", "$orderItemsquantity" ]}}
              total: { $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] } }
          },
      },
  ])
  
  if (!totalSales) {
      return next(new ErrorHandler('error sales ', 404))
  }
  if (!sales) {
      return next(new ErrorHandler('error sales ', 404))
  }
  let totalPercentage = {}
  totalPercentage = sales.map(item => {
       
      console.log( ((item.total/totalSales[0].total) * 100).toFixed(2))
      percent = Number (((item.total/totalSales[0].total) * 100).toFixed(2))
      total =  {
          name: item._id.product,
          percent
      }
      return total
  }) 
  // return console.log(totalPercentage)
  res.status(200).json({
      success: true,
      totalPercentage,
  })

}


const createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,

    name: req.user.name,

    rating: Number(rating),

    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;

        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);

    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};

module.exports = {
  getProducts,
  newProduct,
  getSingleProduct,
  getAdminProducts,
  updateProduct,
  deleteProduct,
  productSales,
  createProductReview
};
