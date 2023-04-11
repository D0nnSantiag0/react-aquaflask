import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import {Link, useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address:"",
  });

  const { name, email, password,phone,address} = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("address", address);
    formData.set("phone", phone);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />
    
      <div class="row wrapper"style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '110vh',
      }} >
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mb-3">Register</h1>
           

            <div className="form-group col-lg-12">
           
           <label htmlFor="email_field">Name</label>
            
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
             
            </div>

            <div className="form-group col-lg-12">
          
              <label htmlFor="email_field">Address</label>
              <input
                type="address"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={onChange}
              />
          
            </div>

            <div className="form-group col-lg-12">
              <label htmlFor="phone_field">Phone</label>
            
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                name="phone"
                value={phone}
                onChange={onChange}
              />
            
            </div>
            <div className="form-group col-lg-12">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="form-group col-lg-12">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="form-group col-lg-12">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group col-lg-10">
            <Link to="/login" className="float-right mb-4">
                 Already have an account? Login here.
                </Link>
            </div>

            <Button
             variant="light"
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              REGISTER
            </Button>
           
           
          </form>
          
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
