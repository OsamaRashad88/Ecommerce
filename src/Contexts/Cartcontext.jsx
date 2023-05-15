import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export let Cartcontext = createContext(null);
export function CartcontextProvider(props) {
  const [cartId, setcartId] = useState(null);
  const [numOfCartItems, setnumofcartitems] = useState(0);

  async function getcart() {
    let response = await getUserCart();
    if (response?.data?.status === "success") {
      setnumofcartitems(response.data.numOfCartItems);
      setcartId(response.data.data._id);
    }
  }
  useEffect(() => {
    getcart();
  }, []);
  let headers = { token: localStorage.getItem("userToken") };
  function addtocart(x) {
    return axios
      .post(
        "https://route-ecommerce.onrender.com/api/v1/cart",
        {
          productId: x,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getUserCart(x) {
    return axios
      .get(
        "https://route-ecommerce.onrender.com/api/v1/cart",

        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function removeitem(productId) {
    return axios
      .delete(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,

        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function updatecount(productId, count) {
    return axios
      .put(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,

        {
          count: count,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function onlinepayment(cartId, shippingaddress) {
    return axios

      .post(
        `{{BaseUrl}}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,

        {
          shippingaddress: shippingaddress,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <Cartcontext.Provider
      value={{
        setnumofcartitems,
        cartId,
        numOfCartItems,
        addtocart,
        getUserCart,
        removeitem,
        updatecount,
        onlinepayment,
      }}
    >
      {props.children}
    </Cartcontext.Provider>
  );
}
