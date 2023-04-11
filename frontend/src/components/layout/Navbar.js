import React from "react";
import {Link, NavLink, useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";

import logo from "../../img/favicon.ico";
//import { FiUser } from "react-icons/fi";
import { BsSuitHeart } from "react-icons/bs";
import { BsBag, BsFillPersonFill} from "react-icons/bs";
import { DarkModeBtn } from "./DarkModeBtn";

// import SideMenu from "./Sidebar";
// import Profile from "../user/profile";
// import "../../App.css";
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
  const handleCart = () => {
    navigate("/cart");
  };
  const handleHeart = () => {
    navigate("/wishlist");
  };
  const handleSignup = () => {
    navigate("/register");
  };
  const logoutHandler = () => {
    dispatch(logout());

    notify("Logged Out Successfully");
  };
 
  return (
    <div className="Navbar">
      <Flex
        h={"9vh"}
        display="flex"
        justifyContent={"right"}
        gap="10px"
        alignItems={"center"}
        bg={colorMode === "dark" ? "none" : "#19376D"}
      >
            {user ? (
          <Box>
            <div className="ml-4 dropdown d-inline">
              <Link
                to="#!"
                className="btn dropdown-toggle text-white mr-4"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {/* <figure className="avatar avatar-nav"> */}
              
                   <Icon
                w={6}
                h={6}
                my="4"
                mx="3"
                as={BsFillPersonFill}
                cursor={"pointer"}
              />
                {/* </figure> */}

                <span>{user && user.name}</span>
              </Link>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}

                <Link className="dropdown-item" to="/orders/me">
                  Orders
                </Link>

                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>

                {/*<Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>*/}

                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          </Box>
        ) : ( !loading && (
          <Button
            bg={"black"}
            color={"whitesmoke"}
            border={"1px solid beige"}
            _hover={{
              bg: "none",
              color: "teal",
            }}
            onClick={handleSignup}
          >
            Sign up
          </Button>
        )
        )}
        <Box mr={["5", "6", "7", "9"]}>
          {" "}
          <DarkModeBtn />
        </Box>
      </Flex>
      <Flex fontWeight="bold">
        <HStack onClick={handleHome} cursor={"pointer"}>
          <Image width={["25px"]} m={5} src={logo} alt="logo" />
        </HStack>
        <Spacer />
        {isLargerThan ? (
          <HStack>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : baseStyle)}
              to="/products"
            >
              {/* <Text
                color={colorMode === "dark" ? "white" : "black"}
                my="4"
                mx="2"
              >
                WELCOME TO DRINKH20
              </Text> */}
            </NavLink>
          </HStack>
        ) : null}

        <Spacer />

        <HStack>
          {/* <Box>
            <Icon
              w={6}
              h={6}
              my="4"
              mx={isLargerThan ? "3" : "1"}
              as={BsSearch}
            />
          </Box> */}

          <Box onClick={handleHeart}>
            <Flex
              onClick={handleCart}
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
              onClick={handleCart}
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
                {/* {cart ? cart.length : 0} */}
              </Text>
            </Flex>
          </Box>
          {/* <Box> {!isLargerThan && <SideMenu colorMode={colorMode} />}</Box> */}
        </HStack>
      </Flex>
    </div>
  );
};

export default Navbar;
