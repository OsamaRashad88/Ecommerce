import React, { useContext, useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Cartcontext } from "../Contexts/Cartcontext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Cart() {
  let { getUserCart, removeitem, updatecount, setnumofcartitems } =
    useContext(Cartcontext);

  const [cartDetails, setCartDetails] = useState(null);
  async function getCart() {
    let response = await getUserCart();
    if (response?.data?.status === "success") {
      setCartDetails(response.data.data);

      console.log(response);
    }
  }
  async function deleteitem(productId) {
    let response = await removeitem(productId);
    console.log(response);
    setCartDetails(response.data.data);
    setnumofcartitems(response.data.numOfCartItems);

    toast("product removed");
  }
  async function updatequantity(productId, count) {
    let response = await updatecount(productId, count);
    setCartDetails(response.data.data);
    toast("product count updated");
  }
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartDetails != null ? (
        <div className="bg-main-light p-4 my-4">
          <h3>Shop Cart</h3>
          <h6 className="text-main">
            Total Cart price: {cartDetails.totalCartPrice}
          </h6>
          {cartDetails.products.map((product) => (
            <div className="row align-items-center border-bottom py-2 my-2">
              <div key={product.productId} className="col-md-1">
                <img
                  src={product.product.imageCover}
                  alt=""
                  className="w-100"
                />
              </div>
              <div className="col-md-11 d-flex justify-content-between">
                <div>
                  <h6>{product.product.title}</h6>
                  <h6 className="text-main">Price: {product.price}</h6>
                  <button
                    onClick={() => deleteitem(product.product._id)}
                    className="btn m-0 p-0"
                  >
                    Remove
                  </button>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    onClick={() =>
                      updatequantity(product.product._id, product.count + 1)
                    }
                    className="btn border-main btn-sm text-dark fs-3"
                  >
                    +
                  </button>
                  <span className="mx-2">{product.count}</span>
                  <button
                    onClick={() =>
                      updatequantity(product.product._id, product.count - 1)
                    }
                    className="btn border-main btn-sm text-dark fs-3"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="btn bg-main" Link>
            <Link to={"./Checkout"}>checkout</Link>
          </button>
        </div>
      ) : null}
    </>
  );
}
