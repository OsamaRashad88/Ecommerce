import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Details from "./components/Home/Details";
import Register from "./components/Login-Register/Register";
import Checkout from "./components/Checkout";
import {
  createBrowserRouter,
  RouterProvider,
  children,
  useNavigate,
  createHashRouter,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Products from "./components/Home/Products";
import Login from "./components/Login-Register/Login";
import jwtDecode from "jwt-decode";
import Logout from "./components/Logout";
import Protectedroute from "./components/Protected/Protectedroute";
import Cart from "./components/Cart";
import { CartcontextProvider } from "./Contexts/Cartcontext";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveuserData();
    }
  }, []);

  function saveuserData() {
    console.log("Save User Data Works ✅");
    let encodedToken = localStorage.getItem(`userToken`);
    let decodedToken = jwtDecode(encodedToken);
    setuserData(decodedToken);
    console.log(userData);
    console.log("Save User Data ens ✅");
  }

  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout userData={userData} setuserData={setuserData} />,
      children: [
        {
          index: true,
          element: (
            <Protectedroute>
              <Home />
            </Protectedroute>
          ),
        },
        {
          path: "products",
          element: (
            <Protectedroute>
              <Products />
            </Protectedroute>
          ),
        },
        { path: "products/:id", element: <Details /> },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login saveuserData={saveuserData} /> },
        { path: "logout", element: <Logout /> },
        { path: "cart", element: <Cart /> },
        { path: "cart/Checkout", element: <Checkout /> },
      ],
    },
  ]);
  return (
    <CartcontextProvider>
      <Toaster></Toaster>
      <RouterProvider router={routers}></RouterProvider>)
    </CartcontextProvider>
  );
}
