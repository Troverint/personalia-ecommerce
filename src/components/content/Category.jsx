import React from "react";
import { PiHoodie } from "react-icons/pi";

const category = [
  { id: 1, type: "PAKAIAN", tag: <PiHoodie /> },
  { id: 2, type: "HOODIE", tag: <PiHoodie /> },
  { id: 3, type: "CELANA", tag: <PiHoodie /> },
  { id: 4, type: "JAKET", tag: <PiHoodie /> },
  { id: 5, type: "AKSESORIS", tag: <PiHoodie /> },
  { id: 6, type: "KEMEJA", tag: <PiHoodie /> },
];

const Category = () => {
  return (
    <div className="w-[2000px]  h-[230px] flex flex-col justify-center items-center">
      <div className="wrapper w-[1170px]">
        <h1 className="font-bold font-poppins text-2xl mb-2 text-[#000000]">
          Category
        </h1>
        <div className="pakaian flex flex-wrap items-center gap-y-3 justify-between">
          {category.map((item) => (
            <div
              key={item.id}
              className="w-[32%] h-[60px] font-bold text-center flex justify-between font-poppins text-xl rounded-md"
            >
              <div className="w-[20%] border-2 border-[#000000] text-[#000000] h-full flex items-center justify-center rounded-md">
                {item.tag}
              </div>
              <h1 className="w-[78%] border-2 border-[#000000] text-[#000000] h-full flex items-center justify-center rounded-md">
                {item.type}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
