import React, { Fragment, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

// import { useAlert } from 'react-alert'

import { useDispatch, useSelector } from "react-redux";

import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import { Box } from "@chakra-ui/react";

const OrderDetails = () => {
  // const alert = useAlert();

  const dispatch = useDispatch();

  const {
    loading,
    error,
    order = {},
  } = useSelector((state) => state.orderDetails);

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  let { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      alert.error(error);

      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      <MetaData title={"Order Details"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Box>
          <section class="h-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-10 col-xl-8">
        <div class="card" style={{borderradius: '10px'}}>
          <div class="card-header px-4 py-5">
            <h5 class="text-muted mb-0"><span style={{color: '#a8729a'}}>Hello, {user !== undefined && user.name}</span>!</h5>
          </div>
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <p class="lead fw-normal mb-0" style={{color: '#a8729a'}}>Order Details</p>
              <p class="small text-muted mb-0">Order ID: {order._id}</p>
            </div>
            <div class="card shadow-0 border mb-4">
              <div class="card-body">
                <div class="row">
                {orderItems && orderItems.map(item => (
                  <div key={item.product} className="row my-5">
                  <div class="col-md-2">
                    <img src={item.image} alt={item.name} height="100px" width="500px" />
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p class="text-muted mb-0">{item.name}</p>
                  </div>
                   <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                   <p class="text-muted mb-0 ">{item.price}</p>
                   </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                  <p class="text-muted mb-0 ">Qty:{item.quantity}</p>
                  </div>
                  <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                  <p class="text-muted mb-0 small ">Product ID:{item.product}</p>
                  </div>
                  </div>
                   ))}
                </div>
                <hr class="mb-4" style={{backgroundcolor: '#e0e0e0', opacity: '1'}}/>

                </div>
              </div>
             
            </div>
            
       

            <div class="d-flex justify-content-between pt-2">
              <p class="fw-bold mb-0">Payment and Shipping Details</p>
              <p class="text-muted mb-0"><span class="fw-bold me-4">Total Price: </span><b>{totalPrice}</b></p>
            </div>

            <div class="d-flex justify-content-between pt-2">
              <p class="text-muted mb-0">Shipping Address : {shippingDetails}</p>
              <p class="text-muted mb-0"><span class="fw-bold me-4">Payment Status: </span><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>
            </div>

            <div class="d-flex justify-content-between">
              <p class="text-muted mb-0">Contact Number:{shippingInfo && shippingInfo.phoneNo}</p>
              <p class="text-muted mb-0"><span class="fw-bold me-4">Order Status: </span><b>{orderStatus}</b></p>
            </div>

          </div>
     
        </div>
      </div>
    </div>
  
</section>
</Box>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;