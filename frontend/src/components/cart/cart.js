import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery,
  Badge,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Empty from "../cart/EmptyCart";

import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

const Cart = () => {
  const [isLargerThan] = useMediaQuery("(min-width: 768px)");
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  let navigate = useNavigate();

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <Empty />
      ) : (
        <div>
          <Box align="left" width={["95%", "90%", "80%", "85%"]} m="auto">
            <Heading my={"2"}>YOUR BAG</Heading>
            <Text my={"2"}>TOTAL [{cartItems.length} items]</Text>
            <Text my={"2"}>
              Items in your bag are not reserved — check out now to make them
              yours.
            </Text>
          </Box>
          {/* -------------------------------UP HeadLines-------------------------------------------------------- */}
          <Flex
            width={["100%", "100%", "90%", "90%"]}
            m="auto"
            justifyContent={"space-between"}
            flexDirection={isLargerThan ? "row" : "column"}
          >
            <Box width={["95%", "90%", "50%", "60%"]} m="auto">
              {cartItems.map((item) => (
                <Flex
                  border="3px solid beige"
                  m="auto"
                  my={"4"}
                  flexDirection={isLargerThan ? "row" : "column"}
                >
                  <Box height={"50%"} width={["100%", "100%", "40%", "30%"]}>
                    <Image w="100%" src={item.image} alt="try" />
                  </Box>
                  {/* -----------------------------------UP Image---------- Down description--------------------------------------------------------------------- */}
                  <Box
                    width={["95%", "90%", "60%", "60%"]}
                    align={"left"}
                    mx={"4"}
                    my={"6"}
                  >
                    <Flex justifyContent={"space-between"}>
                      <Text>{item.name} </Text>
                      <Box>
                        <Text> ${item.price}</Text>

                        <Button
                          colorScheme="red"
                          size="sm"
                          leftIcon={<DeleteIcon />}
                          onClick={() => removeCartItemHandler(item.product)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Flex>
                    {/* <Text my={"2"}>{item.color} </Text>
                      <Text> SIZE : {item.size} </Text> */}
                    <Flex my={"4"} alignItems={"center"} gap="1rem">
                      <Button
                        bg="black"
                        colorScheme={"blue"}
                        p="0"
                        borderRadius={"50%"}
                        border={"1px solid black"}
                        disabled={item.qty === 0}
                        onClick={() => decreaseQty(item.product, item.quantity)}
                      >
                        <MinusIcon fontSize={"10"} />
                      </Button>
                      <input
                        type="number"
                        className="form-control count d-inline"
                        value={item.quantity}
                        hidden
                      />
                      <Text>{item.quantity}</Text>
                      <Button
                        colorScheme={"blue"}
                        p="0"
                        bg="black"
                        borderRadius={"50%"}
                        border={"1px solid black"}
                        onClick={() =>
                          increaseQty(item.product, item.quantity, item.stock)
                        }
                      >
                        <AddIcon fontSize={"10"} />
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
              ))}
            </Box>
            {/* ------------------------------up fetching cart and down checkout---------------------------------------- */}
            {/* <Box width={["95%", "90%", "40%", "35%"]}>
              <CheckOutPage
                title={"CHECKOUT"}
                cart={cart}
                show_price={show_price}
                discount_price={discount_price}
                link={"/checkout"}
                quantity={quantity}
              />
            </Box> */}
            <Box width={["95%", "90%", "40%", "35%"]}>
              <Box w="100%" m="auto">
                <Stack>
                  <Button
                    border={"3px solid beige"}
                    bg={"black"}
                    color={"white"}
                    fontWeight={"bold"}
                    colorScheme={"none"}
                    p="1.5rem"
                    _hover={{ bg: "none", color: "teal" }}
                    onClick={() => navigate("/shipping")}
                  >
                    CHECKOUT
                  </Button>
                </Stack>

                <Stack spacing={5} my={"7"} border="3px solid beige">
                  <Heading size={"md"} align={"left"} mx={"2"}>
                    ORDER SUMMARY
                  </Heading>
                  <Flex lineHeight={"10"}>
                    <Box align={"left"} mx={"2"} my={"4"}>
                      <Text>QUANTITY</Text>
                      <Text>TOTAL</Text>
                    </Box>
                    <Box mx={"2"} my={"4"}>
                      <Text>
                        {" "}
                        {cartItems.reduce(
                          (acc, item) => acc + Number(item.quantity),
                          0
                        )}{" "}
                        (Units)
                      </Text>
                      <Text>
                        {cartItems
                          .reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )
                          .toFixed(2)}
                      </Text>
                    </Box>
                  </Flex>
                </Stack>
              </Box>
            </Box>
          </Flex>
        </div>
      )}
      <Box my={"5rem"}></Box>
    </>
  );
};

export default Cart;