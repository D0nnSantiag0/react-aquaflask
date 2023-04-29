const mongoose = require("mongoose");

const validator = require("validator");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,

    required: [true, "Please enter your name"],

    maxLength: [30, "Your name cannot exceed 30 characters"],
  },

  email: {
    type: String,

    required: [true, "Please enter your email"],

    unique: true,

    validate: [validator.isEmail, "Please enter valid email address"],
  },
  phone: {
    type: String,

    required: [false, "Please enter your phone number"],

    maxLength: [11, "Your phone number cannot exceed 11 characters"],
  },

  address: {
    type: String,

    required: [false, "Please enter your address"],

    maxLength: [100, "Your address cannot exceed 30 characters"],
  },

  password: {
    type: String,

    required: [true, "Please enter your password"],

    minlength: [6, "Your password must be longer than 6 characters"],

    select: false,
  },

  avatar: {
    public_id: {
      type: String,

      required: true,
    },

    url: {
      type: String,

      required: true,
    },
  },

  role: {
    type: String,

    default: "user",
  },
  
  googleId: {
    type: String,
    
    required: false
  },

  createdAt: {
    type: Date,

    default: Date.now,
  },

  resetPasswordToken: String,

  resetPasswordExpire: Date,
});

// uncomment to test bcrypt

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Return JWT token

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

userSchema.methods.getResetPasswordToken = function () {
  // Generate token

  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash and set to resetPasswordToken

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire time

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};


module.exports = mongoose.model("User", userSchema);
