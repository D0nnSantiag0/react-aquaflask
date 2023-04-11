import { AiFillHeart } from "react-icons/ai";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery,
  useToast,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, StarIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// import { addToCart } from "../../redux/CartReducer/action";
// import { addToWishList } from "../../redux/WishReducer/action";
import Navbar from "../layout/Navbar";
// import { BsBagFill } from "react-icons/bs";

const ProductDetails = () => {
  //
  const [quantity, setQuantity] = useState(1);
  let { id } = useParams();

  const toast = useToast();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();
  const [currentProducts, setCurrentProducts] = useState({});
  const [isLargerThan] = useMediaQuery("(min-width: 768px)");
  const [size, setSize] = useState(null);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  //   const handleCart = () => {
  //     let payload = {
  //       ...currentProducts,
  //       size,
  //     };

  //     dispatch(addToCart(payload));
  //   };
  //   const handleWishList = () => {
  //     let payload = {
  //       ...currentProducts,
  //     };
  //     dispatch(addToWishList(payload, toast));
  //   };

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "50px" });

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;

    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;

    setQuantity(qty);
  };

  // const nextSlide = () => {
  //   setActiveIndex(
  //     activeIndex === product.images.length - 1 ? 0 : activeIndex + 1
  //   );

  // };

  // const prevSlide = () => {
  //   setActiveIndex(
  //     activeIndex === 0 ? product.images.length - 1 : activeIndex - 1
  //   );

  // };

  const nextSlide = () => {
    setActiveIndex((activeIndex + 1) % product.images.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      activeIndex === 0 ? product.images.length - 1 : activeIndex - 1
    );
  };

  return (
    <div key={product.id}>
      <Flex
        justify={"space-between"}
        flexDirection={isLargerThan ? "row" : "column"}
      >
        <Box width={["100%", "100%", "60%", "60%"]} min-height={"100vh"}>
          <Box w="full">
            <Flex justify="center">
              <Box
                w={["full", "full", "50%"]}
                maxW="800px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
              >
                <Box pos="relative">
                  <Box
                    pos="absolute"
                    top="50%"
                    left="0"
                    cursor="pointer"
                    onClick={prevSlide}
                  >
                    <BiLeftArrowAlt size="40px" />
                  </Box>
                  <Box
                    pos="absolute"
                    top="50%"
                    right="0"
                    cursor="pointer"
                    onClick={nextSlide}
                  >
                    <BiRightArrowAlt size="40px" />
                  </Box>
                  {product.images &&
                    product.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image.url}
                        alt={`Slide ${index + 1}`}
                        maxHeight="100%"
                        maxWidth="100%"
                        display={index === activeIndex ? "block" : "none"} // Display only the active slide
                      />
                    ))}
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* --------------------------------------------------------------------- */}

        {/* ------------------------------details Box------------------------------------ */}
        <Box
          width={["100%", "100%", "35%", "35%"]}
          min-height={"100vh"}
          textAlign={"left"}
          my={"6"}
        >
          <Box>
            <Heading>{product.name}</Heading>
            <p id="product_id">Product # {id}</p>
            <br />
            <hr />
            <br />

            <Text
              as={Flex}
              alignItems={"center"}
              fontSize={["xs", "sm", "md", "md"]}
            >
              {/* <Icon as={StarIcon} color="yellow.500" /> : {product.rating} */}
              {[...Array(5)].map((_, index) => (
                <Icon
                  key={index}
                  as={StarIcon}
                  color={
                    index < Math.floor(product.ratings)
                      ? "yellow.400"
                      : "gray.300"
                  }
                />
              ))}
              : {product.rating} Review : ({product.numOfReviews}){" "}
            </Text>
            <br />
            <hr />

            <Box mx={"4"} my={"6"} fontSize={["sm", "md", "lg", "xl"]}>
              <Text fontSize={"xl"}>
                {/* MRP :
                <span style={{ textDecoration: "line-through" }}>
                  ₹{product.price}.00
                </span> */}
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}
                >
                  ${product.price}
                </span>
              </Text>
              {/* <Badge color={"grey"} fontWeight={"bold"}>
                incl. of taxes and duties
              </Badge> */}
            </Box>

            <Box>
              {/* <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div> */}

              <Flex my={"4"} alignItems={"center"} gap="1rem">
                <Button
                  bg="black"
                  colorScheme={"teal"}
                  p="0"
                  borderRadius={"50%"}
                  border={"1px solid black"}
                  onClick={decreaseQty}
                >
                  <MinusIcon fontSize={"10"} />
                </Button>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  hidden
                />
                <Text>{quantity}</Text>

                <Button
                  colorScheme={"teal"}
                  p="0"
                  bg="black"
                  borderRadius={"50%"}
                  border={"1px solid black"}
                  onClick={increaseQty}
                >
                  <AddIcon fontSize={"10"} />
                </Button>
              </Flex>
            </Box>

            <Box mt="3rem" align={"left"}>
              <Button
                width={["100%", "100%", "70%", "70%"]}
                bg="black"
                color={"whitesmoke"}
                colorScheme={"blackAlpha"}
                disabled={!size}
                // onClick={handleCart}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
          <br />
          <hr />
          <br />
          <Badge ml="1" fontSize="1rem" colorScheme="telegram">
            Status :{" "}
            <span
              id="stock_status"
              className={product.stock > 0 ? "greenColor" : "redColor"}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </Badge>
          <br />
          <br />
          <hr />

          {/* ------------------------------details Box End------------------------------------ */}

          {/* ------------------------------description Box------------------------------------ */}
          <Box mt={"2rem"} align={"left"} mx={"4"}>
            <Badge ml="1" fontSize="1rem" colorScheme="blackAlpha">
              Description :
            </Badge>

            <UnorderedList spacing={"3"} my={"4"}>
              <ListItem fontSize={"md"} fontWeight={"semibold"}>
                {product.description}{" "}
              </ListItem>
            </UnorderedList>

            <Badge ml="1" fontSize="1rem" colorScheme="blackAlpha">
              Sold By :
            </Badge>

            <UnorderedList spacing={"3"} my={"4"}>
              <ListItem fontSize={"md"} fontWeight={"semibold"}>
                {product.seller}
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
      </Flex>
    </div>
  );
};

export default ProductDetails;
