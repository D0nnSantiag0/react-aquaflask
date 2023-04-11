// import React from "react";

// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="sidebar-wrapper">
//       <nav id="sidebar">
//         <ul className="list-unstyled components">
//           <li>
//             <Link to="/dashboard">
//               <i className="fa fa-tachometer"></i> Dashboard
//             </Link>
//           </li>

//           <li>
//             <a
//               href="#productSubmenu"
//               data-toggle="collapse"
//               aria-expanded="false"
//               className="dropdown-toggle"
//             >
//               <i className="fa fa-product-hunt"></i> Products
//             </a>

//             <ul className="collapse list-unstyled" id="productSubmenu">
//               <li>
//                 <Link to="/admin/products">
//                   <i className="fa fa-clipboard"></i> All
//                 </Link>
//               </li>

//               <li>
//                 <Link to="/admin/product">
//                   <i className="fa fa-plus"></i> Create
//                 </Link>
//               </li>
//             </ul>
//           </li>

//           <li>
//             <Link to="/admin/orders">
//               <i className="fa fa-shopping-basket"></i> Orders
//             </Link>
//           </li>

//           <li>
//             <Link to="/admin/users">
//               <i className="fa fa-users"></i> Users
//             </Link>
//           </li>

//           <li>
//             <Link to="/admin/reviews">
//               <i className="fa fa-star"></i> Reviews
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Icon,
  Box,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { colorMode } = useColorMode();
  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <text>View More </text>
        <Icon
          as={HamburgerIcon}
          color={colorMode === "dark" ? "white" : "black"}
        />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>DASHBOARD</DrawerHeader>

          <DrawerBody mt={"1rem"}>
            <Stack spacing={"8"}>
            <Box>
                <Link to="/dashboard">Dashboard</Link>
              </Box>
              <Box>
                <Link to="/admin/products">All Products</Link>
              </Box>
              {/* <Box>
                <Link to="/men">Men's</Link>
              </Box>
              <Box>
                <Link to="/women">Women's</Link>
              </Box>
              <Box>
                <Link to="/shoes">Shoes</Link>
              </Box> */}
            </Stack>
          </DrawerBody>
          {/* <DrawerBody mt={"1rem"}>
            <Stack spacing={"8"}>
              <Box>
                <Link to="/admin/product">Create Product</Link>
              </Box>
              <Box>
                <Link to="/men">Men's</Link>
              </Box>
              <Box>
                <Link to="/women">Women's</Link>
              </Box>
              <Box>
                <Link to="/shoes">Shoes</Link>
              </Box>
            </Stack>
          </DrawerBody> */}

          {/* <DrawerFooter>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}