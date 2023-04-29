import {
  Box,
  Button,

  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,

  Spinner,
  Stack,
  Text,
 
} from "@chakra-ui/react";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

//import swal from "sweetalert";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { login, clearErrors,glogin } from "../../actions/userActions";


import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
//import { LOGIN_S } from "../redux/AuthReducer/actionType";

import { ViewIcon } from "@chakra-ui/icons";
const notify = (message = "") =>
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const Login = () => {
  // const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState([]);

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [eye, setEye] = useState(false);
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const handleEye = () => {
    setEye((prev) => !prev);
  };

  if (isAuthenticated) {
    // history.push('/')

    navigate(redirect);
  }


  useEffect(() => {
    if (isAuthenticated && redirect === "shipping") {
      // navigate(redirect.get('redirect'), {replace: true})

      navigate(`/${redirect}`, { replace: true });
    } else if (isAuthenticated) navigate("/");

    if (error) {
      notify(error);

      dispatch(clearErrors());
    }
    if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            dispatch(glogin(res.data))
          })
          .catch((err) => console.log(err));
      }
    }, [dispatch, isAuthenticated, error, navigate, redirect, user]);

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };
  
  const googlelogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textTransform={"uppercase"}>
              Sign in to your account
            </Heading>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={eye ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button variant={"ghost"} onClick={handleEye}>
                      <ViewIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"black"}
                  color={"whitesmoke"}
                  _hover={{
                    bg: "none",
                    color: "black",
                    border: "1px solid black",
                  }}
                  onClick={loginHandler}
                >
                  {loading ? <Spinner /> : "Login"}
                </Button>
                <Button
                    color="dark"
                    className="button1"
                    onClick={() => googlelogin()}
                  >
                    <span>Continue with Google</span>
                  </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Don't have an account?
                  <RouterLink to="/register" color={"blue.400"}>
                    Signup
                  </RouterLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;