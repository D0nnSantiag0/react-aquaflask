import { useEffect, useState,Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Box, Spacer, Grid, ColorModeProvider } from "@chakra-ui/react";
import Product from "./product/Product";
import { useMediaQuery } from "@chakra-ui/react";
import Loading from "../components/layout/Loading";
import { useLocation, useSearchParams, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { getProducts } from "../actions/productActions";
import Slider, { Range, createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import Pagination from "react-js-pagination";



const Home = () => {
  const dispatch = useDispatch();
  const createSliderWithToolTip = Slider.createSliderWithToolTip;
  const Range = createSliderWithTooltip(Slider.Range);
  const [price, setPrice] = useState([1, 1000]);
  const [color, setColor] = useState("");
  const [size,setSize] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [isLargerThan] = useMediaQuery("(min-width: 768px)");

    const colors = [
      "Reds",
      "Blues",
      "Greens",
      "Pinks",
      "Purples",
  ]

  const sizes = [
      "14oz",
      "18oz",
      "22oz",
      "32oz",
      "40oz",
      "64oz",
  ]


  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  let { keyword } = useParams();

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price, color));
    if (error) {
      return alert.error(error);
    }
  }, [dispatch, alert, error, keyword, price, currentPage, color]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <div className="AllProducts">
      <h1>ALL PRODUCT</h1>
      {loading ? (
        <Loading />
        ) : (
          <Fragment>
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
                              onClick={() => setColor(color)}
                            >
                              {color}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      <br/>
                  {products?.length > 0 &&
                    products?.map((item) => {
                    return <Product key={item.key} item={item} />;
                  })}
                    </div>
                  </div>

                </Fragment>
              ) : (
             
                <Grid
                templateColumns={
                  isLargerThan ? "repeat(4, 1fr)" : "repeat(2, 1fr)"
                }
                gap={"5px"}
              >
               {products?.length > 0 &&
                products?.map((item) => {
                  <br/>
                  return <Product key={item.key} item={item} />;
                })}
              </Grid>
               
              )}
            </div>
          
            </Box>

            <Box>
            {resPerPage <= count && (
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
        
          )}
            
            </Box>
          
         
        </Flex>
        </Fragment>
      )}
    </div>
  );
};

export default Home;