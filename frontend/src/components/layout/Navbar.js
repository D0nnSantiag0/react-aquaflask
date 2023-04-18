import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Spacer,
  Text,
  useColorMode,
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { GrLogout } from "react-icons/gr";
import logo from "../../img/logo.png";
//import { FiUser } from "react-icons/fi";
import { BsSuitHeart } from "react-icons/bs";
import { BsBag, BsFillPersonFill } from "react-icons/bs";
import { DarkModeBtn } from "./DarkModeBtn";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isLargerThan] = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

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
  const dispatch = useDispatch();

  // const cart = useSelector((store) => store.cart.cart);
  // const wishlist = useSelector((store) => store.wishReducer.wishlist);
  const { colorMode } = useColorMode();
  const baseStyle = {
    color: "black",
    textDecoration: "none",
  };

  const activeStyle = {
    color: "#027bff",
    textDecoration: "none",
    transition: "0.5s",
    borderBottom: "2px solid black",
  };

  const handleHome = () => {
    navigate("/");
  };
  // const handleCart = () => {
  //   navigate("/cart");
  // };
  const handleHeart = () => {
    navigate("/wishlist");
  };
  const handleSignin = () => {
    navigate("/login");
  };
  const logoutHandler = () => {
    dispatch(logout());

   
  };

  // const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="Navbar">
      <Flex fontWeight="bold" bg={colorMode === "dark" ? "none" : "#ebecec"}>
        <HStack onClick={handleHome} cursor={"pointer"}>
          <Image width={["200px"]} m={5} src={logo} alt="logo" />
        </HStack>
        <Spacer />

        <Spacer />

        <HStack>
          <Box onClick={handleHeart}>
            <Flex
              // onClick={handleCart}
              alignItems={"center"}
              alignContent={"center"}
              justifyContent={"center"}
            >
              <Icon
                w={6}
                h={6}
                my="4"
                mx="3"
                as={BsSuitHeart}
                cursor={"pointer"}
              />
              <Text
                position="relative"
                top="-15px"
                left="-25px"
                borderRadius="50%"
                p="0rem 0.3rem"
                bg="blue.500"
                color="white"
              >
                {/* {wishlist ? wishlist.length : 0} */}
              </Text>
            </Flex>
          </Box>
          <Box>
            <Flex
              // onClick={handleCart}
              alignItems={"center"}
              alignContent={"center"}
              justifyContent={"center"}
            >
              <Icon w={6} h={6} my="4" mx="3" as={BsBag} cursor={"pointer"} />
              <Text
                position="relative"
                top="-15px"
                left="-25px"
                borderRadius="50%"
                p="0rem 0.3rem"
                bg="blue.500"
                color="white"
              >
                {/* {cartItems.length} */}
              </Text>
            </Flex>
          </Box>

          {user ? (
            <div>
              <Menu>
                <MenuButton
                  p="0"
                  borderRadius={"50%"}
                  bg="none"
                  color="black"
                  as={Button}
                  colorScheme="none"
                  rightIcon={<ChevronDownIcon ml={"-15px"} fontSize={"20px"} />}
                >
                  <Avatar
                    size={"sm"}
                    name={user.length !== 0 ? user.name : ""}
                    src={user.avatar && user.avatar.url}
                  />
                  <Text
                    fontSize={"xs"}
                    color={colorMode === "dark" ? "white" : "black"}
                  >
                    {user.length !== 0 ? user.name : ""}
                  </Text>
                </MenuButton>
                <MenuList>
                  <MenuGroup>
                    <MenuItem fontWeight={"bold"}>
                      {user.length !== 0 ? user.name : ""}
                    </MenuItem>
                    <MenuDivider />
                    {user ? (
                      <MenuItem onClick={() => navigate("/me")}>
                        <Avatar
                          size={"xs"}
                          name={user.length !== 0 ? user.name : ""}
                        />
                        <Text fontSize={"sm"}>
                          Profile
                        </Text>
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={() => navigate("/myaccount")}>
                        <CgProfile /> My Account
                      </MenuItem>
                    )}

                    <MenuItem onClick={() => navigate("/wishlist")}>
                      <MdOutlineFavoriteBorder color={"red"} />
                      Wishlist
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/cart")}>
                      <BsCartCheck color={"blue"} />
                      Cart
                    </MenuItem>
                    <MenuItem onClick={logoutHandler}>
                      <GrLogout />
                      Logout
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </div>
          ) : (
            !loading && (
              <Button
                bg={"black"}
                color={"whitesmoke"}
                border={"1px solid beige"}
                _hover={{
                  bg: "none",
                  color: "teal",
                }}
                onClick={handleSignin}
              >
                Login
              </Button>
            )
          )}
          <Box mr={["5", "6", "7", "9"]}>
            {" "}
            <DarkModeBtn />
          </Box>
        </HStack>
      </Flex>
    </div>
  );
};

export default Navbar;
