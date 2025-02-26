import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiStar } from "react-icons/ci";

import { Link } from "react-router-dom";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getProduct();
    getCategory();
  }, []);

  // const totalProduct = product.slice(0, 5);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product");
      setProduct(response.data);
      console.log(response.data);
    } catch (error) {}
  };

  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/category");
      setCategory(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-300" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-amber-300" />);
    }

    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} className="text-yellow-400" />);
    }

    return stars;
  };

  return (
    <div className="w-screen mb-13 flex flex-col justify-center items-center  overflow-hidden">
      <div className="wrapper w-[1170px] mx-auto">
        {/* <h1 className="text-3xl font-poppins font-semibold mb-3 ">Product</h1>
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {totalProduct.map((o, i) => (
            <div
              className="relative w-full rounded-2xl flex flex-col mb-3"
              key={i}
            >
              <Link to={`/product/${o.id}`}>
                <img
                  src={o.image}
                  alt={o.name}
                  className="w-[230px] h-[250px] border-3 border-[#000000] rounded-lg mb-1"
                />
                <h1 className="font-poppins font-semibold uppercase ">
                  {o.name}
                </h1>
                <div className="flex items-center ">
                  {renderStars(o.rating)}
                  <span className="ml-2">{o.rating}/ 5</span>
                </div>
                <h1 className="font-poppins font-semibold text-xl ">
                  Rp {o.price.toLocaleString("id-ID")}
                </h1>
                <h1
                  className="font-bilbo absolute top-0 bg-[#FFFFFF] 
              rounded-tr-xs rounded-bl-xs rounded-br-xl 
              border-r-3 border-b-3 text-[#000000] font-bold border-[#000000] px-3 shadow-2xl"
                >
                  Personalia
                </h1>
              </Link>
            </div>
          ))}
        </div> */}
        {category.map((category, i) => (
          <div className="mb-12">
            <h1 className="text-3xl font-poppins font-semibold mb-3 ">
              {category.category_name}
            </h1>
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {category.Products?.map((o, i) => (
                <div
                  className="relative w-full rounded-2xl flex flex-col mb-3"
                  key={i}
                >
                  <Link to={`/product/${o.id}`}>
                    <img
                      src={o.image}
                      alt={o.name}
                      className="w-[230px] h-[250px] border-3 border-[#000000] rounded-lg mb-1"
                    />
                    <h1 className="font-poppins font-semibold uppercase ">
                      {o.name}
                    </h1>
                    <div className="flex items-center ">
                      {renderStars(o.rating)}
                      <span className="ml-2">{o.rating}/ 5</span>
                    </div>
                    <h1 className="font-poppins font-semibold text-xl ">
                      Rp {o.price.toLocaleString("id-ID")}
                    </h1>
                    <h1
                      className="font-bilbo absolute top-0 bg-[#FFFFFF] 
                      rounded-tr-xs rounded-bl-xs rounded-br-xl 
                      border-r-3 border-b-3 text-[#000000] font-bold border-[#000000] px-3 shadow-2xl"
                    >
                      Personalia
                    </h1>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
