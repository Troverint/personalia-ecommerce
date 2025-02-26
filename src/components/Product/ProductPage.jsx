import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaCheck,
  FaStarHalfAlt,
  FaRegStar,
  FaPlus,
} from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [ulasan, setUlasan] = useState("");
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/product/${id}`);
      setProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Gagal mengambil data produk", error);
    }
  };

  const createReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3000/review/create/${id}`,
        {
          rating,
          ulasan,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Ulasan berhasil dibuat");
    } catch (error) {
      console.log(error);
    }
  };

  const addCart = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("Data yang dikirim:", { ProductId: id, quantity, size });

      const response = await axios.post(
        "http://localhost:3000/add/cart",
        {
          ProductId: id,
          quantity,
          size,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("berhasil:", response.data);
      alert("berhasil menambah item ke cart");
    } catch (error) {
      alert(error.response?.data.msg || error);
     
    }
  };

  return (
    <div className="w-full mx-auto mt-3 flex justify-center min-h-screen overflow-hidden">
      <div className="wrapper w-[1170px] h-[450px] flex">
        <div className="mr-10 bg-amber-200">
          <img
            src={product.image}
            alt=""
            className="w-[414px] h-[450px] border-3 border-[#000000] rounded-lg mb-1"
          />
        </div>

        <div className="flex flex-col justify-between">
          <h1 className="uppercase font-poppins font-bold text-6xl">
            {product.name}
          </h1>
          <div className="flex mb-3 items-center mt-2 font-poppins font-semibold">
            {Array.from({ length: product.rating }, (_, i) => (
              <FaStar key={i} className="text-yellow-300" />
            ))}
            <span className="mt-[5px] ml-2"> {product.rating} / 5</span>
          </div>
          <h1 className="font-poppins font-semibold">{product.description}</h1>
          <h1>
            Stock:{" "}
            {product.Stocks?.reduce(
              (total, stock) => total + stock.quantity,
              0
            )}
          </h1>
          <div className="border-1 w-[340px] mt-4 opacity-20 mb-1"></div>

          <div className="">
            <h1 className="mb-1 font-poppins ">Pilih Warna</h1>
            <div className="flex gap-3">
              <div className="p-3 bg-amber-800 rounded-full">
                <FaCheck />
              </div>
              <div className="py-3 px-5 bg-amber-500 rounded-full"></div>
              <div className="py-3 px-5 bg-amber-200 rounded-full"></div>
            </div>
            <div className="border-1 w-[340px] mt-4 opacity-20 mb-1"></div>
          </div>

          <h1 className="mb-1 font-poppins mt-3">Pilih Ukuran</h1>
          <div className="flex gap-3">
            {product.Stocks?.map((o, i) => (
              <button
                key={i}
                className={`py-2 px-7 rounded-full ${
                  size === o.size ? "bg-black text-white" : "bg-[#474448]/40"
                }`}
                onClick={() => setSize(o.size)}
              >
                {o.size}
              </button>
            ))}
          </div>
          <div className="border-1 w-[340px] mt-7 opacity-20 mb-1"></div>

          <div className="flex items-center mt-[30px] w-full justify-between grow gap-2">
            <div className="border-2 flex justify-center items-center h-full border-[#474448] rounded-md grow font-poppins font-semibold">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                <FaMinus />
              </button>
              <input
                type="number"
                value={quantity}
                readOnly
                className="w-10 text-center ml-"
              />
              <button onClick={() => setQuantity((prev) => prev + 1)}>
                <FaPlus />
              </button>
            </div>

            <button className="border-2 h-full border-[#474448] rounded-md grow font-poppins font-semibold">
              BUY
            </button>
            <button
              onClick={addCart}
              className="border-2 h-full border-[#474448] rounded-md grow font-poppins font-semibold"
            >
              CART
            </button>
          </div>
        </div>

        <div className="flex flex-col grow ml-4 h-[450px]">
          <div className="font-bold text-3xl font-poppins">Reviews</div>
          <div className="flex flex-col grow">
            {product.Reviews?.map((o, i) => (
              <div
                className="flex flex-col px-1 pb-1 border-2 rounded-md border-[#000000]/40 mb-1"
                key={i}
              >
                <div className="flex items-center">
                  <h2 className="font-semibold capitalize mt-2 font-poppins">
                    {o.User.name}
                  </h2>
                  <h1 className="flex text-lg mt-[5px] ml-2">
                    {Array.from({ length: o.rating }, (_, i) => (
                      <FaStar key={i} className="text-yellow-300" />
                    ))}
                  </h1>
                  <h1 className="text-gray-500 text-sm ml-2 mt-[5px] italic">
                    {" "}
                    {new Date(o.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </h1>
                </div>
                <h1>{o.ulasan}</h1>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <h1>Add a Review</h1>
            <form onSubmit={createReview}>
              <input
                type="text"
                value={ulasan}
                onChange={(e) => setUlasan(e.target.value)}
                className="w-full h-[40px] border-2 border-[#000000] rounded-md px-8 py-2 font-poppins focus:outline-none"
                placeholder="Share Your Thought"
                required
              />
              <div className="flex gap-x-3">
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full mt-2 h-[40px] border-2 border-[#000000] rounded-md font-poppins"
                >
                  <option value="">Pilih Rating</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {"⭐".repeat(num)} ({num})
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full mt-2 h-[40px] border-2 border-[#000000] rounded-md font-poppins"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
