import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const defaultPfp =
    "https://i.pinimg.com/474x/61/2b/5a/612b5a6b17a8ac212aa71513597d3004.jpg";

  const [profile, setProfile] = useState({});
  const [pfp, setPfp] = useState(defaultPfp);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setPfp(response.data.pfp || defaultPfp);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-screen h-[86vh] flex justify-center">
      <div className="w-[1170px] flex flex-col items-center mt-10">
        <h1 className="font-poppins font-bold uppercase text-3xl mb-3">
          Profile
        </h1>
        <div className="border-2 flex flex-col justify-center items-center pt-9 w-[400px] rounded-md">
          <img src={pfp} alt="Profile" className="h-20 w-20 rounded-full" />
          <div className="flex flex-row items-center w-full px-9 mt-3">
            <h1>Nama :</h1>
            <h1 className="ml-2 font-poppins font-medium mt-1">
              {profile.name}
            </h1>
          </div>
          <div className="flex flex-row items-center w-full px-9 mt-3">
            <h1>Email :</h1>
            <h1 className="ml-2 font-poppins font-medium mt-1">
              {profile.email}
            </h1>
          </div>
          <div className="flex flex-row items-center w-full px-9 mt-3">
            <h1>Balance :</h1>
            <h1 className="ml-2 font-poppins font-medium mt-1">
            Rp {profile.balance ? profile.balance.toLocaleString("id-ID") : "0"}
            </h1>
          </div>
          <div className="flex flex-row gap-x-1 items-center justify-center">
            <button
              onClick={handleSignOut}
              className="rounded-md border-2 border-[#474448] flex items-center h-[40px] w-[140px] mt-3 mb-5"
            >
              <BiLogOut className="ml-6 mr-2" />{" "}
              <span className="-mt-1">Sign Out</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-md border-2 border-[#474448] h-[40px] w-[140px] mt-3 mb-5"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EditProfileModal
          profile={profile}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={getProfile}
        />
      )}
    </div>
  );
};

const EditProfileModal = ({ profile, isOpen, onClose, onUpdate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pfp, setPfp] = useState("");
  const [balance, setBalance] = useState("" || 0);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setPfp(profile.pfp || "");
      setBalance(profile.balance || "");
    }
  }, [isOpen, profile]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedData = { name, email, pfp, balance };
      if (password.trim()) {
        updatedData.password = password;
      }
      await axios.put("http://localhost:3000/user/update/token", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="block text-sm font-medium">Nama</label>
            <input
              type="text"
              className="w-full border-2 rounded-md p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border-2 rounded-md p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">
              Foto Profil (URL)
            </label>
            <input
              type="text"
              className="w-full border-2 rounded-md p-2"
              value={pfp}
              onChange={(e) => setPfp(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Balance</label>
            <input
              type="text"
              className="w-full border-2 rounded-md p-2"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">
              Password (opsional)
            </label>
            <input
              type="password"
              className="w-full border-2 rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded-md"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
