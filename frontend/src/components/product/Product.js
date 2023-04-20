import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AiOutlineStar } from "react-icons/ai";
import { StarIcon } from "@chakra-ui/icons";

const ProductDis = ({ item }) => {
  const navigate = useNavigate();
  const { _id, name, color, gender, images, price, numOfReviews, ratings } =
    item;
  const [img, setImg] = useState(images[0].url);
  const handleDes = () => {
    navigate(`/product/${_id}`);
  };
  //   const ChangeHoverImage = () => {
  //     setImg(images[1]);
  //   };
  //   const OriginalImage = () => {
  //     setImg(images[0]);
  //   };

  function Rating() {
    return (
      <Flex alignItems="center">
        {Array(5)
          .fill("")
          .map((_, index) => {
            const roundedRating = Math.floor(ratings * 2) / 2;
            if (roundedRating - index >= 1) {
              return (
                <BsStarFill
                  key={index}
                  style={{ marginLeft: "1" }}
                  color={index < ratings ? "teal.500" : "gray.300"}
                />
              );
            }
            if (roundedRating - index === 0.5) {
              return <BsStarHalf key={index} style={{ marginLeft: "1" }} />;
            }
            return <BsStar key={index} style={{ marginLeft: "1" }} />;
          })}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numOfReviews} review{numOfReviews > 1 && "s"}
        </Box>
      </Flex>
    );
  }

  return (
    <div>
      <Box
        key={_id}
        width={"95%"}
        m="auto"
        bg={useColorModeValue("white", "gray.800")}
        onClick={handleDes}
        my={"3"}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image className="imageAnimation" src={img} alt={name} />

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize={["xs", "sm", "md", "md"]}
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {name}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={ratings} numReviews={numOfReviews} />
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box as="span" color={"gray.600"} fontSize="lg">
                ₱
              </Box>
              {price.toFixed(2)}
            </Box>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default ProductDis;