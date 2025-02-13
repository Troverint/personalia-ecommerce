import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Starting = () => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(0); // Mulai dengan teks transparan

  useEffect(() => {
    // Animasi fade-in
    setTimeout(() => {
      setOpacity(1);
    }, 500); // Mulai transisi setelah 0.5 detik

    // Navigasi ke "/register" setelah 3 detik
    const timer = setTimeout(() => {
      navigate("/register");
    }, 4000);

    return () => clearTimeout(timer); // Membersihkan timer jika komponen di-unmount
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex font-bilbo text-9xl items-center justify-center">
      <h1
        className="transition-opacity duration-2000"
        style={{ opacity }} // Efek fade-in
      >
        Personalia
      </h1>
    </div>
  );
};

export default Starting;
