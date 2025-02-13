import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [pembeli, setPembeli] = useState([]);

  useEffect(() => {
    getPembeli();
  }, []);

  const getPembeli = async () => {
    try {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage

      const response = await axios.get("http://localhost:3000/user", {
        headers: {
          Authorization: `Bearer ${token}`, // Kirim token dalam header
        },
      });

      setPembeli(response.data.pembeli);
      console.log(response.data.pembeli);
    } catch (error) {
      console.error("Error fetching pembeli:", error);
    }
  };

  return (
    <div className="bg-red-500">
      {pembeli.map((item) => (
        <div className="" key={item.id}>
          <h1>{item.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default Test;
