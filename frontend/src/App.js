import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";

//-----------------LAYOUTS-----------------------//
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Header from "./components/layout/Header";
import Home from "./components/Home";

//------------------PRODUCTS---------------------------------//
import ProductDetails from "./components/product/ProductDetails";

//-------------------USER----------------------//
import Login from "./components/user/login";
import Register from "./components/user/register";
import Profile from './components/user/profile';

//------------------ADMIN------------------------//
import Dashboard from "./components/admin/Dashboard";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UsersList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import NewProduct from "./components/admin/NewProduct";
import ProductsList from "./components/admin/ProductList";
import UpdateProduct from "./components/admin/UpdateProduct";




function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
// function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} exact="true" />
        <Route path="/products" element={<Home />} exact="true" />
        <Route path="/product/:id" element={<ProductDetails />} exact="true" />

        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
        <Route path="/me" element={<Profile />} exact="true" />
        
        <Route path="/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /> </ProtectedRoute> } />
        <Route path="/admin/product" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>}/>
        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}><ProductsList /></ProtectedRoute>}/>
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>}/>
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UsersList /></ProtectedRoute>}/>
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>}/>
  
      </Routes>
     
      <ToastContainer />
      {!loading && (!isAuthenticated || user.role !== "admin") }
      {/* <Footer /> */}

    </div>
   
  );
  
}

export default App;

