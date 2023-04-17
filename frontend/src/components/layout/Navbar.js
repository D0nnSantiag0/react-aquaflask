import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
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
import { BsBag } from "react-icons/bs";
import { DarkModeBtn } from "./DarkModeBtn";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

// import SideMenu from "./Sidebar";
// import Profile from "../Profile/Profile";

const Navbar = () => {
  // const { auth } = useSelector((state) => state.auth);
  const { user, loading } = useSelector((state) => state.auth);

  const [isLargerThan] = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const auth = useSelector((state) => state.AuthReducer.isAuth);

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
  };
  const handleProfile = () =>{
    navigate("/me")
  }

  return (
    <div className="Navbar">
      <Flex
        h={"9vh"}
        display="flex"
        justifyContent={"right"}
        gap="10px"
        alignItems={"center"}
        bg={colorMode === "dark" ? "none" : "#ebecec"}
      >
  {user ? (
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
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-4" id="login_btn">
                Login
              </Link>
            )
          )}
        {/* <Button
          bg={"black"}
          color={"whitesmoke"}
          border={"1px solid beige"}
          _hover={{
            bg: "none",
            color: "teal",
          }}
          onClick={logoutHandler}
        >
          Logout
        </Button> */}
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
              <Text
                color={colorMode === "dark" ? "white" : "black"}
                my="4"
                mx="2"
              >
                Home
              </Text>
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