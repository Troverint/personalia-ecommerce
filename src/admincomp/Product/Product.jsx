import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product");
      setProduct(response.data);
      // console.log(response.data);
      console.log(response.data);
    } catch (error) {}
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex justify-center  h-screen ">
        <div className="w-[90%] h-full flex flex-col justify-center mt-14">
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-3xl font-poppins">Product</h1>
              <div className="flex justify-center items-center border-2 px-3 py-2 rounded font-semibold">
                <FaPlus className="mr-2" />
                Add a product
              </div>
            </div>
          </div>
          <div className="w-full mt-3 border-2 border-[#474448] rounded-md ">
            <table className="min-w-full p-3 shadow-xl rounded-md text-[#474448] font-bold border-none">
              <thead>
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2 border-x">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2 border-x">Price</th>
                  <th className="px-4 py-2">Rating</th>
                  <th className="px-4 py-2 border-x">Stock</th>
                  <th className="px-4 py-2">action</th>
                </tr>
              </thead>

              <tbody>
                {product.map((o, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 border text-center">{i + 1}</td>
                    <td className=" border text-center flex py-3 justify-center items-center">
                      <img
                        src={o.image}
                        alt={o.name}
                        className="w-[60px] h-[64px]  border-3 border-[#000000] rounded-lg mb-1"
                      />
                    </td>
                    <td className="px-4 py-2 border text-center">{o.name}</td>
                    <td className="px-4 py-2 border text-center">{o.price}</td>
                    <td className="px-4 py-2 border text-center">{o.rating}</td>
                    <td className="px-4 py-2 border text-center">
                      <h1>{o.Stocks.length}</h1>
                    </td>
                    <td className="px-4 py-2 border text-center"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
