import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      
      console.log("Login berhasil:", response.data);
      alert("Login berhasil!");
    if(password ==="admin") return navigate("/dashboard")

      navigate("/home");
    } catch (err) {
      console.error("Login gagal:", err.response?.data?.msg || err.message);
      setError(err.response?.data?.msg || "Terjadi kesalahan");
    }
  };



  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="wrapper">
        <div className="flex justify-center items-center flex-col">
          <h1 className="font-bilbo text-8xl font-semibold text-[#000000]">
            Personalia
          </h1>
          <h2 className=" mb- font-semibold text-xl font-poppins text-[#000000]">
            Login
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <h3>
              Don't Have An Account?{" "}
              <Link to="/register" className="text-[#E63946]">
                Register
              </Link>
            </h3>
        </div>
        <div className="form">
          <form onSubmit={handleLogin} className="p-6">
            <div className="name flex flex-col mb-5">
              <label className="mb-1 opacity-70 font-poppins">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-[#E5E5E5] 
                  rounded-xl px-8 py-2 font-poppins focus:outline-none  focus:border-[#000000] "
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="name flex flex-col mb-5">
              <label className="mb-1 opacity-70 font-poppins">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-[#E5E5E5] 
                  rounded-xl px-8 py-2 font-poppins focus:outline-none  focus:border-[#000000] "
                placeholder="Enter Your password"
                required
              />
            </div>
            <div className=" flex justify-center items-center">
              <button
                type="submit"
                className="btn border-2 font-poppins transition-all duration-200 ease-in-out font-semibold w-full   border-[#000000] rounded-xl px-3 py-1 hover:bg-[#000000]  hover:text-[#FFFFFF]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
