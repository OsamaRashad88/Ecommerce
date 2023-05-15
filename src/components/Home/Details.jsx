import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { Cartcontext } from "../../Contexts/Cartcontext";
import { toast } from "react-hot-toast";
import Slider from "react-slick";
export default function Details() {
  let { addtocart, setnumofcartitems, createcart } = useContext(Cartcontext);
  let [productdetails, setproductdetails] = useState({});
  const { id } = useParams();
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
  async function getproductDetails() {
    let { data } = await axios(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );
    setproductdetails(data.data);
    console.log(productdetails);
  }
  useEffect(() => {
    getproductDetails();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-3">
            <Slider {...settings}>
              {productdetails?.images?.map((image) => (
                <img src={image} alt="" width={`100%`} />
              ))}
            </Slider>
          </div>
          <div className="col-md-9">
            <h2>{productdetails.title}</h2>
            <p>{productdetails.description}</p>
            <h5>price :{productdetails.price}</h5>
            <h5>Quantity :{productdetails.Quantity}</h5>
            <button
              onClick={() => addproduct(productdetails._id)}
              className="btn bg-main text-white w-100"
            >
              + Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
