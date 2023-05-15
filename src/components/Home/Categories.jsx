import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.css";
export default function Categories() {
  let [cats, setcats] = useState([]);

  async function getcats() {
    let data = await axios(
      "https://route-ecommerce.onrender.com/api/v1/categories"
    );
    setcats(data.data.data);
  }
  useEffect(() => {
    getcats();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {cats.map((element) => (
        <div key={element._id}>
          <img src={element.image} alt="" className="cat-image" />
          <p className="text-center">{element.name}</p>
        </div>
      ))}
    </Slider>
  );
}
