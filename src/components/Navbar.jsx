import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCartShopping,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [profile, setProfile] = useState(null);
  const [pfp, setPfp] = useState(
   "" 
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3000/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
      setPfp(response.data.pfp || "https://i.pinimg.com/474x/61/2b/5a/612b5a6b17a8ac212aa71513597d3004.jpg");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <div className="h-[13vh] w-[1170px] mx-auto flex items-center">
      <div className="wrapper h-full w-[1200px] mx-auto flex items-center justify-between">
        <div className="logo h-full w-[30%] flex justify-between items-center overflow-hidden">
          <h1 className="font-bilbo font-semibold text-5xl text-[#000000]">
            <Link to="/home">Personalia</Link>
          </h1>
          <h1 className="font-semibold font-poppins text-[#000000] transition-all duration-200 ease-in-out hover:bg-[#000000]/80 hover:text-[#FFFFFF] p-2 rounded-xl">
            KATEGORI
          </h1>
        </div>
        <div className="flex items-center w-[70%] justify-end gap-[24px] h-full">
          <div className="search-bar rounded p-1">
            <form action="" className="mx-auto">
              <div className="input flex items-center gap-2">
                <div className="ring-1 ring-[#000000] h-9 w-[410px] pl-3 pt-3 pb-3 flex flex-row items-center transition-all duration-200 ease-in-out focus-within:ring-2 focus:outline-none focus-within:ring-[#2D232E] rounded-xl bg-[#E5E5E5]/20 justify-center text-[#000000]">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="text-xl mr-3 opacity-45 text-[#000000]"
                  />
                  <input
                    type="text"
                    placeholder="search"
                    className="w-full focus:outline-none"
                  />
                </div>
                <button className="h-9 w-20 font-poppins font-semibold border-2 border-[#000000] transition-all duration-200 ease-in-out rounded-xl bg-[#000000] text-[#FFFFFF] hover:text-[#000000] hover:bg-[#FFFFFF]">
                  search
                </button>
              </div>
            </form>
          </div>
          <div className="profile flex justify-evenly items-center">
            <div className="flex items-center relative justify-center h-[50px] w-[50px] mr-[-20px]">
              <Link to="/user/cart">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-2xl text-[#000000]"
                />
              </Link>
              <h2 className="absolute top-0 right-0 px-2 py-1 rounded-full bg-[#E63946] h-5 w-5 flex items-center justify-center text-[#FFFFFF]">
                {profile?.Carts?.length || 0}
              </h2>
            </div>
            {token ? (
              <Link to="/user/profile">
                <div className="ml-8 flex items-center">
                  {pfp && (
                    <img
                      src={pfp}
                      alt="Profile"
                      className="h-10 w-10 rounded-full"
                    />
                  )}
                  <h1 className="font-semibold font-poppins uppercase text-[#000000] ml-2">
                    {profile?.name}
                  </h1>
                </div>
              </Link>
            ) : (
              <div className="ml-8">
                <button className="border-2 ml-4 font-poppins font-semibold py-[3px] px-2 rounded-md">
                  <Link to="/login">Masuk</Link>
                </button>
                <button className="border-2 ml-3 font-poppins font-semibold py-[3px] px-2 rounded-md">
                  <Link to="/register">Daftar</Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
