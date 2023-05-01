import { useEffect, useState, Fragment } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import FilterData from "../Filter/Filters/FilterData";
// import { getData } from "../redux/DataReducer/action";
import { Flex, Box, Spacer, Grid, Heading } from "@chakra-ui/react";
import Product from "./product/Product";
import { useMediaQuery } from "@chakra-ui/react";
import Loading from "../components/layout/Loading";
import { useLocation, useSearchParams, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { getProducts } from "../actions/productActions";
import Carousel from "../components/layout/Carousel";
import Slider, { Range, createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { AiOutlineFileSearch } from "react-icons/ai";
import Pagination from "react-js-pagination";
import InfiniteScroll from "react-infinite-scroll-component";
import Paginate from "../components/product/Paginate";
//import FilterChecked from "../Filter/Filters/FilterChecked";
const Home = () => {
  const dispatch = useDispatch();
  const createSliderWithToolTip = Slider.createSliderWithToolTip;
  const Range = createSliderWithTooltip(Slider.Range);
  const [price, setPrice] = useState([1, 1000]);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [isLargerThan] = useMediaQuery("(min-width: 768px)");

  const colors = ["Reds", "Blues", "Greens", "Pinks", "Purples"];

  const sizes = ["14oz", "18oz", "22oz", "32oz", "40oz", "64oz"];

  const {
    loading,
    products,
    error,
    productsCount,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  let { keyword } = useParams();

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price, color, size));
    if (error) {
      return alert.error(error);
    }
  }, [dispatch, alert, error, keyword, price, currentPage, color, size]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  //INFINITESCROLL
  const [dataSource, setDataSource] = useState(products.slice(0, 3));
  const [hasMore, setHasMore] = useState(true);
  // const [dataSource, setDataSource] = useState([]);
  // const [hasMore, setHasMore] = useState(true);
  

  // const fetchMoreData = () => {
  //   if (dataSource.length < products.length) {
  //     setTimeout(() => {
  //       const newData = products.slice(0, dataSource.length + 3);
  //       setDataSource(newData);
  //     }, 500);
  //   } else {
  //     setHasMore(false);
  //   }
  // };
  const fetchMoreData = () => {
    setTimeout(() => {
      if (dataSource.length >= products.length) {
        setHasMore(false);
        return;
      }
      const newData = products.slice(0, dataSource.length + 3);
      setDataSource(newData);
    }, 500);
  };
  
  useEffect(() => {
    if (products.length > 0) {
      setDataSource(products.slice(0, 3));
    }
  }, [products]);

  return (
    <div className="AllProducts">
      <br />

      {loading ? (
        <Loading />
      ) : (
        // <>

        <Flex flexDirection={isLargerThan ? "row" : "column"}>
          <Box width={isLargerThan ? "100%" : "100%"}>
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">Colors</h4>
                        <ul className="pl-0">
                          {colors.map((color) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={color}
                              onClick={() => setColor(color)}>
                              {color}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">Sizes</h4>
                        <ul className="pl-0">
                          {sizes.map((size) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={size}
                              onClick={() => setSize(size)}>
                              {size}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <AiOutlineFileSearch size={"2em"} />
                      <Heading
                        align={"left"}
                        style={{
                          marginLeft: "10px",
                          marginBottom: "0",
                          fontSize: "15px",
                        }}>
                        Search result for '{keyword}'
                      </Heading>
                    </div>

                    <div className="row">
                      <br />
                      {products?.length > 0 &&
                        products?.map((item) => {
                          return <Product key={item.key} item={item} />;
                        })}
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Box w="95%" m="auto">
                  <Carousel />
                  <br />
                  <br />
                  <Heading align={"center"}> Products</Heading>

                  <InfiniteScroll
                    dataLength={dataSource.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<p>Loading...</p>}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                      </p>
                    }>
                    <Grid
                      templateColumns={
                        isLargerThan ? "repeat(3, 1fr)" : "repeat(2, 1fr)"
                      }
                      gap={"5px"}>
                      {dataSource.map((item) => (
                        <Product key={item.key} item={item} />
                      ))}
                    </Grid>
                  </InfiniteScroll>
                </Box>
              )}
            </div>
          </Box>
        </Flex>
      )}
    </div>
  );
};

export default Home;