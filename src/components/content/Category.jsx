import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { PiHoodie } from "react-icons/pi";
import { Link } from "react-router-dom";



const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/category");
      setCategory(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[2000px]  h-[230px] flex flex-col justify-center items-center">
      <div className="wrapper w-[1170px]">
        <h1 className="font-bold font-poppins text-2xl mb-2 text-[#000000]">
          Category
        </h1>
        <div className="pakaian flex flex-wrap items-center gap-y-3 justify-between">
          {category.map((item) => (
            <Link to={`/category/${item.category_name}`} key={item.id}
            className="w-[32%] h-[60px] font-bold text-center flex justify-between font-poppins text-xl rounded-md">
          
              <div className="w-[20%] border-2 border-[#000000] text-[#000000] h-full flex items-center justify-center rounded-md">
                <PiHoodie />
              </div>
              <h1 className="w-[78%] border-2 border-[#000000] text-[#000000] h-full flex items-center justify-center rounded-md">
                {item.category_name}
              </h1>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
