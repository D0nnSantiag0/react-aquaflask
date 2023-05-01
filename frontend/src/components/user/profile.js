import React, { Fragment } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import Loader from "../layout/Loader";

import MetaData from "../layout/MetaData";


import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { Center } from "@chakra-ui/react";
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
const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const avatarUrl = user?.avatar?.url ?? 'images/default-avatar.png';
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Your Profile"} />

          <section style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5">
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <div
                        class="center-image"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <figure className="avatar avatar-profile">
                          <img
                            className="rounded-circle img-fluid"
                            // src={user.avatar && user.avatar.url ? user.avatar.url : "images/default_avatar.jpg"}
                            src = {user.avatar !== undefined && user.avatar.url}
                            alt={user.name}
                            // { product.category !== undefined && product.category.categoryName }
                          />
                    
                        </figure>
                      </div>
                      <div className="d-flex justify-content-center mb-2">
                        <Stack spacing={10}>
                          <Button
                            bg={"black"}
                            color={"whitesmoke"}
                            _hover={{
                              bg: "none",
                              color: "black",
                              border: "1px solid black",
                            }}
                            id="login_button"
                            onClick={() => navigate("/me/update")}
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                          >
                            {loading ? <Spinner /> : "Edit Profile"}
                          </Button>
                        </Stack>

                        <Stack spacing={10}>
                          <Button
                            bg={"none"}
                            color={"black"}
                            border={"1px solid black"}
                            _hover={{
                              bg: "black",
                              color: "whitesmoke",
                            }}
                            id="login_button"
                            onClick={() => navigate("/password/update")}
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                          >
                            {loading ? <Spinner /> : "Change Password"}
                          </Button>
                        </Stack>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Full Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {user.name}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {user.email}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Phone</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {user.phone}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />

                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Address</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {user.address}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;