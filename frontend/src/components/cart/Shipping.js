import React, { Fragment, useState } from "react";

import { useNavigate } from "react-router-dom";

import { countries } from "countries-list";

import MetaData from "../layout/MetaData";

import CheckoutSteps from "./CheckoutSteps";

import { useDispatch, useSelector } from "react-redux";

import { saveShippingInfo } from "../../actions/cartActions";
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
const Shipping = () => {
  const countriesList = Object.values(countries);

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);

  const [city, setCity] = useState(shippingInfo.city);

  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);

  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const [country, setCountry] = useState(shippingInfo.country);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));

    navigate("/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Shipping Info"} />

      <CheckoutSteps shipping />
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
                  Shipping Info
                </Heading>

                <FormControl id="Address" isRequired>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    id="address_field"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </FormControl>

                <FormControl id="City" isRequired>
                  <FormLabel>City</FormLabel>
                  <Input
                    type="text"
                    id="city_field"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </FormControl>

                <FormControl id="PhoneNo." isRequired>
                  <FormLabel>PhoneNo.</FormLabel>
                  <InputGroup>
                    <Input
                      type="phone"
                      id="phone_field"
                      className="form-control"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>

                <FormControl id="Postalcode" isRequired>
                  <FormLabel>Postal Code</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      id="postal_code_field"
                      className="form-control"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>

                <FormControl id="Country" isRequired>
                  <FormLabel>Country</FormLabel>
                  <InputGroup>
                    <select
                      id="country_field"
                      className="form-control"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      {countriesList.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </InputGroup>
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
                    id="shipping_btn"
                    type="submit"
                    className="btn btn-block py-3"
                  >
                    Continue
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

export default Shipping;