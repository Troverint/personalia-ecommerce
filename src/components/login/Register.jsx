import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/register", {
        name,
        email,
        password,
        role
      });

      console.log("Register berhasil:", response.data);

      alert("Register berhasil!");
      navigate("/login");
    } catch (error) {
      console.error(
        "Register gagal:",
        error.response?.data?.msg || error.message
      );
      alert(error.response?.data?.msg || "Terjadi kesalahan");
    }
  };

  return (
    <div>
      <div className="w-full h-screen mt-[30px]  flex justify-center">
        <div className="wrapper ">
          <div className="flex justify-center items-center flex-col">
            <h1 className="font-bilbo text-8xl font-semibold text-[#000000]">
              Personalia
            </h1>
            <h1 className=" mb- font-semibold text-l font-poppins">
              Create an Account
            </h1>
            <h3>
              Already Have An Account?{" "}
              <Link to="/login" className="text-[#E63946]">
                Login
              </Link>
            </h3>
          </div>
          <div className="form">
            <form onSubmit={handleRegister} className="p-6">
              <div className="name flex flex-col mb-5">
                <label htmlFor="" className="mb-1 opacity-70 font-poppins">
                  Profile Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-2 border-[#E5E5E5] 
                  rounded-xl px-8 py-2 font-poppins focus:outline-none  focus:border-[#000000] "
                  placeholder="Enter Your Profile Name"
                  required
                />
              </div>
              <div className="name flex flex-col mb-5">
                <label htmlFor="" className="mb-1 opacity-70 font-poppins ">
                  Email
                </label>
                <input
                  type="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-[#E5E5E5] 
                  rounded-xl px-8 py-2 font-poppins focus:outline-none  focus:border-[#000000] "
                  placeholder="Enter Your Email Address"
                  required
                />
              </div>
              <div className="name flex flex-col mb-5">
                <label htmlFor="" className="mb-1 opacity-70 font-poppins ">
                  Password
                </label>
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
                  className="btn border-2  transition-all duration-200 ease-in-out font-semibold w-full   border-[#000000] rounded-xl px-3 py-1 hover:bg-[#000000]  hover:text-[#FFFFFF]"
                >
                  Create An Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
