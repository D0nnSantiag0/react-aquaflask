import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import FilterData from "../Filter/Filters/FilterData";
// import { getData } from "../redux/DataReducer/action";
import { Flex, Box, Spacer, Grid } from "@chakra-ui/react";
import Product from "./product/Product";
import { useMediaQuery } from "@chakra-ui/react";
import Loading from "../components/layout/Loading";
import { useLocation, useSearchParams, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { getProducts } from "../actions/productActions";
import Slider, { Range, createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

import Pagination from "react-js-pagination";

import Paginate from "../components/product/Paginate";
//import FilterChecked from "../Filter/Filters/FilterChecked";
const Home = () => {
  const dispatch = useDispatch();
  //   const products = useSelector((store) => store?.dataReducer?.products);
  const createSliderWithToolTip = Slider.createSliderWithToolTip;
  const Range = createSliderWithTooltip(Slider.Range);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let { keyword } = useParams();

  const categories = [
    "14oz",
    "18oz",
    "22oz",
    "32oz",
    "40oz",
    "64oz",
    "Reds",
    "Blues",
    "Greens",
    "Pinks",
    "Purples",
    "Accessories",
  ];

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [searchParams] = useSearchParams();
  // const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const [isLargerThan] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    dispatch(getProducts(currentPage, price, category));
    if (error) {
      return alert.error(error);
    }
  }, [dispatch, alert, error, price, currentPage, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  let count = productsCount;

  if (keyword) {
    let count = filteredProductsCount;
  }
  console.log(keyword, count, filteredProductsCount, resPerPage);

  return (
    <div className="AllProducts">
      {loading ? (
        <Loading />
      ) : (
        // <>
        <Flex flexDirection={isLargerThan ? "row" : "column"}>
          {/* <Box w={isLargerThan ? "15%" : "100%"}>
            <FilterData />
            <FilterChecked/>
          </Box> */}
          {/* <Spacer /> */}
          <Box width={isLargerThan ? "100%" : "100%"}>
            <Grid
              templateColumns={
                isLargerThan ? "repeat(4, 1fr)" : "repeat(2, 1fr)"
              }
              gap={"5px"}
            >
              {products?.length > 0 &&
                products?.map((item) => {
                  return <Product key={item.key} item={item} />;
                })}
            </Grid>
          </Box>
          {/* {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )} */}
        </Flex>
        //  {totalPosts > postPerPage && (
        //     <Paginate
        //       currentPage={currentPage}
        //       setCurrentPage={setCurrentPage}
        //       totalPosts={totalPosts}
        //       postPerPage={postPerPage}
        //     />
        //   )}
      )}
    </div>
  );
};

export default Home;