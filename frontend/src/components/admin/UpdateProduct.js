import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from "../../actions/productActions";

import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = () => {
  const [name, setName] = useState("");

  const [price, setPrice] = useState(0);

  const [description, setDescription] = useState("");

//   const [category, setCategory] = useState("");
 const [color, setColor] = useState("");
 
 const [size, setSize] = useState("");

  const [stock, setStock] = useState(0);

  const [seller, setSeller] = useState("");

  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);

  const [imagesPreview, setImagesPreview] = useState([]);


  const colors = [
    "Reds",
    "Blues",
    "Greens",
    "Pinks",
    "Purples",
];

const sizes = [
    "14oz",
    "18oz",
    "22oz",
    "32oz",
    "40oz",
    "64oz",
];


//   const categories = [
//     "Electronics",

//     "Cameras",

//     "Laptops",

//     "Accessories",

//     "Headphones",

//     "Food",

//     "Books",

//     "Clothes/Shoes",

//     "Beauty/Health",

//     "Sports",

//     "Outdoor",

//     "Home",
//   ];

  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  let { id } = useParams();

  let navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);

      setPrice(product.price);

      setDescription(product.description);

      setColor(product.color);
      
      setSize(product.size);

      setSeller(product.seller);

      setStock(product.stock);

      setOldImages(product.images);
    }

    if (error) {
      errMsg(error);

      dispatch(clearErrors());
    }

    if (updateError) {
      errMsg(updateError);

      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/products");

      successMsg("Product updated successfully");

      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, product, id]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);

    formData.set("price", price);

    formData.set("description", description);

    formData.set("color", color);

    formData.set("size", size);

    formData.set("stock", stock);

    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(product._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);

    setImages([]);

    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);

          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"Update Product"} />

      {/* <div className="row"> */}
      <div class="row wrapper"style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }} >
        {/* <div className="col-12 col-md-2">
          <Sidebar />
        </div> */}

        <div className="col-12 col-md-8">
          <Fragment>

          <Sidebar />
          <hr></hr>
          <div className="col-15 col-lg-12">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">Update Product</h1>
                <hr></hr>

                <div className="form-group col-lg-12">
                  <label htmlFor="name_field">Name</label>

                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group col-lg-12">
                  <label htmlFor="price_field">Price</label>

                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group col-lg-12">
                  <label htmlFor="description_field">Description</label>

                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group col-lg-12">
                  <label htmlFor="color_field">Color</label>

                  <select
                    className="form-control"
                    id="color_field"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    {colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group col-lg-12">
                  <label htmlFor="size_field">Size</label>

                  <select
                    className="form-control"
                    id="size_field"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group col-lg-12">
                  <label htmlFor="stock_field">Stock</label>

                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group col-lg-12">
                  <label htmlFor="seller_field">Seller Name</label>

                  <input
                    type="text"
                    id="seller_field"
                    className="form-control"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>

                <div className="form-group col-lg-12">
                  <label>Images</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="images"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />

                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Images
                    </label>
                  </div>

                  {oldImages &&
                    oldImages.map((img) => (
                      <img
                        key={img}
                        src={img.url}
                        alt={img.url}
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  UPDATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;