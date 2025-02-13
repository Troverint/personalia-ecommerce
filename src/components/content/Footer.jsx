import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full h-[500px] bg-[#474448] flex items-center justify-center">
      <div className="wrapper w-[1170px] h-full pb-3">
        <div className="">
          <h1 className="font-semibold text-5xl mt-10 font-bilbo text-[#E0DDCF] ">
            Personalia
          </h1>
          <hr className="mt-8 mb-8 px-3 opacity-40 text-[#E0DDCF]" />
        </div>
        <div className=" flex justify-center items-center">
          <div className="">
            <h1 className="font-semibold font-poppins text-xl text-[#E0DDCF] ">
              Lokasi
            </h1>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3752624018807!2d106.71348000856241!3d-6.345426362051042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e582501b86cb%3A0xe17c81c2758ace13!2sSMK%20Letris%20Indonesia%202%20%26%20SMK%20Kesehatan%20Letris%20Indonesia%202!5e0!3m2!1sid!2sid!4v1739349086839!5m2!1sid!2sid"
              width="300"
              height="300"
              style={{ border: "2" }}
              className="border-5 border-[#E0DDCF] "
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="w-full h-full text-[#E0DDCF] flex flex-col justify-center items-center">
            <div className="flex gap-x-6 font-poppins py-4">
              <h1>Home</h1>
              <h1>Experience</h1>
              <h1>Partners</h1>
              <h1>About Us</h1>
              <h1>Contact</h1>
            </div>
            <div className="flex gap-x-3 text-3xl">
              <FaInstagram/>
              <FaFacebook/>
              <FaWhatsapp/>
            </div>
        <h1 className="py-4 ">Copyright 2025 - Personalia</h1>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Footer;
