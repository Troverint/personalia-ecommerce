import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FaCreditCard, FaHome, FaUser } from "react-icons/fa";
import { PiShirtFoldedFill } from "react-icons/pi";

const Sidebar = () => {
  const location = useLocation();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <FaHome className="ml-2 size-7" />,
    },
    {
      path: "/admin/pembeli",
      label: "Pembeli",
      icon: <FaUser className="ml-2 size-7" />,
    },
    {
      path: "/admin/product",
      label: "Product",
      icon: <PiShirtFoldedFill className="ml-2 size-7" />,
    },
    {
      path: "",
      label: "Transaksi",
      icon: <FaCreditCard className="ml-2 size-7" />,
    },
  ];

  return (
    <div className="w-[42vh] h-screen flex justify-start bg-[#474448]">
      <div className="w-[214px] h-[538px] ml-5">
        <div>
          <h1 className="font-poppins text-3xl font-bold mt-4 text-[#E0DDCF] uppercase">
            <Link to="/dashboard">Personalia</Link>
          </h1>
        </div>

        <div className="mt-6 font-bold text-xl font-poppins text-[#E0DDCF]">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className={`flex py-2 items-center mb-3 rounded-lg transition-all ease-in-out duration-160 w-[210px] cursor-pointer ${
                location.pathname === item.path
                  ? "bg-[#E0DDCF] text-[#474448]"
                  : "hover:bg-[#E0DDCF] hover:text-[#474448]"
              }`}
            >
              {item.icon}
              <h1 className="ml-3">
                <Link to={item.path}>{item.label}</Link>
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
