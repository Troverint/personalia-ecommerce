import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaMinus, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdDiscount } from "react-icons/md";

const Cart = () => {
  const [profile, setProfile] = useState([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false); 

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getProfile();
  }, []);

  const total =
    profile.Carts?.reduce(
      (sum, item) => sum + (item.Product?.price || 0) * (item.quantity || 0),
      0
    ) || 0;

  const updateQuantity = async (productId, size, newQuantity) => {
    try {
      if (newQuantity < 1) return;
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/edit/cart",
        { ProductId: productId, size, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data || error);
    }
  };

  const deleteCart = async (productId, size) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete("http://localhost:3000/delete/cart", {
        headers: { Authorization: `Bearer ${token}` },
        data: { ProductId: productId, size }, 
      });

      setProfile((prevProfile) => ({
        ...prevProfile,
        Carts: prevProfile.Carts.filter(
          (item) => item.ProductId !== productId || item.size !== size
        ),
      }));
    } catch (error) {
      console.error(
        "Error deleting cart:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleCheckout = async () => {
    setLoadingCheckout(true);
    try {
      const token = localStorage.getItem("token");
      console.log("Token yang dipakai:", token); 
  
      if (!token) {
        alert("Anda belum login!");
        return;
      }
  
      const response = await axios.delete("http://localhost:3000/checkout", {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      alert(response.data.msg);
      setProfile((prevProfile) => ({ ...prevProfile, Carts: [] }));
    } catch (error) {
      alert(error.response?.data?.msg || "Checkout gagal!");
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <div className="w-full mx-auto mt-3 flex justify-center min-h-screen overflow-hidden ">
      <div className="wrapper w-[1170px] justify-between h-auto p-4 ">
        <div className="w-[45%]">
          <h1 className="font-poppins font-semibold text-4xl">Shopping Cart</h1>
          <h3 className="font-poppins mt-2 opacity-50">
            You have {profile.Carts?.length || 0} products in your cart
          </h3>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-[47%]">
            <div className="mt-4 space-y-4 ">
              {profile.Carts?.map((item, index) => (
                <div key={index} className="border-1 rounded-md p-3">
                  <div className="flex p-3 ">
                    <div>
                      <img
                        src={item.Product.image}
                        alt={item.name}
                        className="w-[116.04px] h-[120px] border-3 border-[#000000] rounded-lg mb-1"
                      />
                    </div>
                    <div className="detail ml-4 h-[120px] font-poppins flex flex-col justify-between">
                      <h2 className="font-semibold text-lg">
                        {item.Product.name}
                      </h2>
                      <p className="text-sm">Size: {item.size}</p>
                      <p className="text-sm ">
                        Price: Rp{item.Product.price.toLocaleString("id-ID")}
                      </p>
                      <div className="border-2 flex w-[45%] px-2 justify-center items-center h-full border-[#474448] rounded-md font-poppins font-semibold">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.Product.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="mr-3"
                        >
                          <FaMinus />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="w-[60%] text-center flex justify-center items-center mx-2"
                        />
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.Product.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <div className="delete border-2 flex justify-center items-center h-[50%] px-3 py-2 rounded-md">
                      <FaTrash className="mr-2" />
                      <button
                        onClick={() => deleteCart(item.ProductId, item.size)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[50%] mt-4 border-1 rounded-md gap-y-20 py-3 px-5 h-[313px]">
            <h1 className="font-poppins font-semibold text-2xl mb-4">
              Order Summary
            </h1>
            <div className="flex justify-between mb-3">
              <h1>Subtotal</h1>
              <h1>Rp {total.toLocaleString("id-ID")}</h1>
            </div>
            <div className="flex justify-between mb-3">
              <h1>Shipping fee</h1>
              <h1>Rp {(100000).toLocaleString("id-ID")}</h1>
            </div>
            <div className="flex justify-between mb-3">
              <h1 className="font-poppins text-2xl font-semibold">Total: </h1>
              <h1 className="font-poppins text-2xl font-semibold">
                Rp {(total + 100000).toLocaleString("id-ID")}
              </h1>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loadingCheckout}
              className="w-full rounded-xl border-2 text-center font-bold text-lg mt-3 p-3 flex justify-center items-center"
            >
              Go to Checkout <FaArrowRight className="ml-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
