import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Cartcontext } from "../../Contexts/Cartcontext";
import toast from "react-hot-toast";
export default function Products() {
  let [products, setProducts] = useState([]);

  let { addtocart, setnumofcartitems } = useContext(Cartcontext);

  async function addproduct(productId) {
    let response = await addtocart(productId);
    if (response?.data?.status == "success") {
      setnumofcartitems(response.data.numOfCartItems);

      toast.success(response.data.message, {
        position: "bottom-right",
        className: "text-center border-success box-shadow",
      });
    } else {
      toast.error(response.data.message, {
        position: "bottom-right",
        className: "text-center border-success box-shadow",
      });
    }
  }

  async function getproducts() {
    let data = await axios(
      "https://route-ecommerce.onrender.com/api/v1/products"
    );
    setProducts(data.data.data);
  }
  useEffect(() => {
    getproducts();
  }, []);

  return (
    <div className="row">
      <h2>featured Products</h2>
      {products.map((element) => (
        <div className=" col-md-2" key={element._id}>
          <div className="product">
            <Link to={`/products/${element._id}`}>
              <img src={element.imageCover} alt="" className="w-100" />
              <h6 className="text-main"> {element.category.name} </h6>
              <p className="fw-bolder">
                {element.title.split(" ").slice(0, 2).join(" ")}
              </p>
              <div className="d-flex justify-content-between align-items-center my-4">
                <span>{element.price}EGP</span>
                <span>
                  {element.ratingAverage}
                  <i className="fa-solid fa-star rating-color "></i>
                </span>
              </div>
            </Link>
            <button
              onClick={() => addproduct(element._id)}
              className="btn bg-main text-white w-100"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
