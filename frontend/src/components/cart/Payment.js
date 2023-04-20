import React, { Fragment, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import MetaData from "../layout/MetaData";

import CheckoutSteps from "./CheckoutSteps";

// import { useAlert } from 'react-alert'

import { useDispatch, useSelector } from "react-redux";

import { createOrder, clearErrors } from "../../actions/orderActions";
import { clearCart } from "../../actions/cartActions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Editable,
  EditablePreview,
  EditableTextarea,
  Spinner,
  useToast,
  Avatar,
  InputLeftElement,
} from "@chakra-ui/react";

const notify = (message = "") =>
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const Payment = () => {
  // const alert = useAlert();

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      notify(error);

      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const order = {
    orderItems: cartItems,

    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;

    order.shippingPrice = orderInfo.shippingPrice;

    order.taxPrice = orderInfo.taxPrice;

    order.totalPrice = orderInfo.totalPrice;
  }

  // const submitHandler = async (e) => {

  //     e.preventDefault();

  //     document.querySelector('#pay_btn').disabled = true;

  //     order.paymentInfo = {

  //         id: 'pi_1DpdYh2eZvKYlo2CYIynhU32',

  //         status: 'succeeded'

  //     }

  //     dispatch(createOrder(order))

  //     navigate('/success')

  // }
  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    order.paymentInfo = {
      id: "pi_1DpdYh2eZvKYlo2CYIynhU32",

      status: "succeeded",
    };

    dispatch(createOrder(order));
    dispatch(clearCart());
    sessionStorage.clear();
    localStorage.clear();
    navigate("/success");
  };

  return (
    <Fragment>
      <MetaData title={"Payment"} />

      <CheckoutSteps shipping confirmOrder payment />

      <form className="shadow-lg" onSubmit={submitHandler}>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}></Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <Heading
                  textTransform={"uppercase"}
                  fontSize={"2xl"}
                  textAlign={"center"}
                >
                  Card Info
                </Heading>

                <FormControl id="Card Number" isRequired>
                  <FormLabel>Card Number</FormLabel>
                  <Input
                    type="text"
                    id="card_num_field"
                    className="form-control"
                    required
                  />
                </FormControl>

                <FormControl id="Card Expiry" isRequired>
                  <FormLabel>Card Expiry</FormLabel>
                  <Input
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                    required
                  />
                </FormControl>

                <FormControl id="Card CVC" isRequired>
                  <FormLabel>Card CVC</FormLabel>
                  <Input
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                    required
                  />
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"black"}
                    color={"whitesmoke"}
                    _hover={{
                      bg: "none",
                      color: "black",
                      border: "1px solid black",
                    }}
                    id="pay_btn"
                    type="submit"
                    className="btn btn-block py-3"
                  >
                    Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>{" "}
      </form>
    </Fragment>
  );
};

export default Payment;