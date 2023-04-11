const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },

  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [5, "Product name cannot exceed 5 characters"],
    default: 0.0,
  },

  description: {
    type: String,
    required: [true, "Please enter product description"],
  },

  ratings: {
    type: Number,
    default: 0,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
    },
  ],

  color: {
    type: String,

    required: [true, "Please select color for this product"],

    enum: {
      values: [
        "Reds",
        "Blues",
        "Greens",
        "Pinks",
        "Purples",
        "Accessories",
      ],

      message: "Please select correct color for product",
    },
  },

  size: {
    type: String,

    required: [true, "Please select size for this product"],

    enum: {
      values: [
        "14oz",
        "18oz",
        "22oz",
        "32oz",
        "40oz",
        "64oz",
      ],

      message: "Please select correct size for product",
    },
  },

  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },

  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "Product name cannot exceed 5 characters"],
    default: 0,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      // user: {

      //     type: mongoose.Schema.ObjectId,

      //     ref: 'User',

      //     required: true

      // },

      name: {
        type: String,
        required: true,
      },

      rating: {
        type: Number,
        required: true,
      },

      comment: {
        type: String,
        required: true,
      },
    },
  ],

  // user: {
  //   type: mongoose.Schema.ObjectId,

  //   ref: "User",

  //   required: true,
  // },

  createdAt: {
    type: Date,

    default: Date.now,
  },
  // user: {

  //     type: mongoose.Schema.ObjectId,

  //     ref: 'User',

  //     required: true

  // },
});

module.exports = mongoose.model("Product", productSchema);
