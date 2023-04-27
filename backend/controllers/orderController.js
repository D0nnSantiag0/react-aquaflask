const Order = require("../models/order");

const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");

// Create a new order   =>  /api/v1/order/new

exports.newOrder = async (req, res, next) => {
  const {
    orderItems,

    shippingInfo,

    itemsPrice,

    taxPrice,

    shippingPrice,

    totalPrice,

    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,

    shippingInfo,

    itemsPrice,

    taxPrice,

    shippingPrice,

    totalPrice,

    paymentInfo,

    paidAt: Date.now(),

    user: req.user._id,
  });

  res.status(200).json({
    success: true,

    order,
  });
};

exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  res.status(200).json({
    success: true,

    order,
  });
};

exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  // console.log(req.user)

  res.status(200).json({
    success: true,

    orders,
  });
};

exports.allOrders = async (req, res, next) => {
  const orders = await Order.find();

   console.log(orders)

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,

    totalAmount,

    orders,
  });
};

exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  (order.orderStatus = req.body.status), (order.deliveredAt = Date.now());

  await order.save();

  res.status(200).json({
    success: true,
  });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

exports.deleteOrder = async (req, res, next) => {

  const { id } = req.params;

  const order = await Order.findOneAndDelete({ _id: id });

  if (!order)
    return res
      .status(404)
      .json({ success: false, message: "Order not found" });

  res.status(200).json({ success: true, message: "Order deleted" });
};

exports.salesPerMonth = async (req, res, next) => {
  const salesPerMonth = await Order.aggregate([
      {
          $group: {
              _id: { year: { $year: "$paidAt" }, month: { $month: "$paidAt" } },
              total: { $sum: "$totalPrice" },
          },
      },

      {
          $addFields: {
              month: {
                  $let: {
                      vars: {
                          monthsInString: [, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', ' Sept', 'Oct', 'Nov', 'Dec']
                      },
                      in: {
                          $arrayElemAt: ['$$monthsInString', "$_id.month"]
                      }
                  }
              }
          }
      },
      { $sort: { "_id.month": 1 } },
      {
          $project: {
              _id: 1,
              month: 1,
             
              total: 1,

          }
      }

  ])
  if (!salesPerMonth) {
      return next(new ErrorHandler('error sales per month', 404))

  }
  // return console.log(customerSales)
  res.status(200).json({
      success: true,
      salesPerMonth
  })

}
// exports.salesPerYear = async (req, res, next) => {
//   const salesPerYear= await Order.aggregate([
//       {
//           $group: {
//               _id: { year: { $year: "$paidAt" }},
//               total: { $sum: "$totalPrice" },
//           },
//       },

//       {
//           $addFields: {
//               month: {
//                   $let: {
//                       vars: {
//                           monthsInString: [, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', ' Sept', 'Oct', 'Nov', 'Dec']
//                       },
//                       in: {
//                           $arrayElemAt: ['$$monthsInString', "$_id.month"]
//                       }
//                   }
//               }
//           }
//       },
//       { $sort: { "_id.month": 1 } },
//       {
//           $project: {
//               _id: 1,
//               year: 1,
             
//               total: 1,

//           }
//       }

//   ])
//   if (!salesPerYear) {
//       return next(new ErrorHandler('error sales per month', 404))

//   }
//   // return console.log(customerSales)
//   res.status(200).json({
//       success: true,
//       salesPerYear
//   })
// }
exports.salesPerYear = async (req, res, next) => {
  const salesPerYear = await Order.aggregate([
    {
      $group: {
        _id: { $year: "$paidAt" },
        total: { $sum: "$totalPrice" },
      },
    },
    {
      $project: {
        _id: 0,
        year: "$_id",
        total: 1,
      },
    },
    { $sort: { year: 1 } },
  ]);
  if (!salesPerYear) {
    return next(new ErrorHandler("error sales per year", 404));
  }
  res.status(200).json({
    success: true,
    salesPerYear,
  });
};

