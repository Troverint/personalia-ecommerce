import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { FaPlus, FaTrash } from "react-icons/fa6";
import axios from "axios";
import { TbWriting } from "react-icons/tb";

const Pembeli = () => {
  const [profile, setProfile] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const customersPerPage = 10;

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user");
      setProfile(response.data.pembeli);
      console.log(response.data.pembeli);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = profile.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const totalPages = Math.ceil(profile.length / customersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentCustomers.map((customer) => customer.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  useEffect(() => {
    if (
      selectedItems.length === currentCustomers.length &&
      currentCustomers.length > 0
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedItems, currentCustomers]);

  const deleteSelectedPembeli = async () => {
    if (selectedItems.length === 0) {
      alert("Pilih setidaknya satu pembeli untuk dihapus.");
      return;
    }

    try {
      await axios.delete("http://localhost:3000/pembeli/delete", {
        data: { ids: selectedItems },
        headers: { "Content-Type": "application/json" },
      });

      setProfile((prevProfile) =>
        prevProfile.filter((pembeli) => !selectedItems.includes(pembeli.id))
      );
      setSelectedItems([]);
    } catch (error) {
      console.error("Gagal menghapus pembeli:", error);
    }
  };

  const openEditModal = () => {
    if (selectedItems.length !== 1) {
      alert("Pilih hanya satu pembeli untuk diupdate!");
      return;
    }
    const selectedPembeli = profile.find((p) => p.id === selectedItems[0]);
    setEditData({
      id: selectedPembeli.id,
      name: selectedPembeli.name,
      email: selectedPembeli.email,
      password: "",
    });
    setIsModalOpen(true);
  };

  const updatePembeli = async () => {
    try {
      await axios.put(`http://localhost:3000/user/update/${editData.id}`, {
        name: editData.name,
        email: editData.email,
        password: editData.password,
      });

      getProfile(); // Refresh data setelah update
      setIsModalOpen(false);
      setSelectedItems([]);
      alert("berhasil update");
    } catch (error) {
      console.error("Gagal mengupdate pembeli:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-[100vh] flex justify-center">
        <div className="w-[90%] h-[96%] mt-5 flex justify-center">
          <div className="w-[942px] h-full flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="font-poppins font-bold text-xl text-[#474448]">
                Customers
              </h1>
              <div className="flex gap-x-3">
                <button className="border-2 border-[#474448] text-[#474448] py-2 px-9 font-semibold rounded-md">
                  Export
                </button>
                <button
                  onClick={openEditModal}
                  className="border-2 border-[#474448] text-[#474448] px-4 font-semibold rounded-md"
                >
                  <TbWriting />
                </button>
                <button
                  onClick={deleteSelectedPembeli}
                  className="border-2  border-[#474448] text-[#474448] px-4 font-semibold rounded-md"
                >
                  <FaTrash />
                </button>
                <button className="flex items-center gap-2 font-semibold bg-[#474448] text-[#E0DDCF] py-2 px-3 rounded-md">
                  <FaPlus /> Add Customer
                </button>
              </div>
            </div>
            <div className="w-[942px] mt-3 border-2 border-[#474448] rounded-md">
              <table className="min-w-full p-3 shadow-xl rounded-md text-[#474448] font-bold border-none">
                <thead>
                  <tr>
                    <th className="border-r">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-4 py-2">No</th>
                    <th className="px-4 py-2 border-x">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Cart</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((o, i) => (
                    <tr key={o.id}>
                      <td className="px-4 py-2 border text-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(o.id)}
                          onChange={() => handleSelectItem(o.id)}
                        />
                      </td>
                      <td className="px-4 py-2 border text-center">
                        {indexOfFirstCustomer + i + 1}
                      </td>
                      <td className="px-4 py-2 border text-center">{o.name}</td>
                      <td className="px-4 py-2 border text-center">
                        {o.email}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        {o.Carts?.length || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-end justify-end mt-4">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`mx-1 px-3 py-1 border rounded-md ${
                    currentPage === i + 1
                      ? "bg-gray-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            {/* Modal Edit */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                <div className="bg-white p-6 rounded-md w-96">
                  <h2 className="text-xl font-semibold mb-4">Edit Pembeli</h2>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    className="border p-2 w-full mb-2"
                  />
                  <input
                    type="password"
                    placeholder="New Password (Optional)"
                    onChange={(e) =>
                      setEditData({ ...editData, password: e.target.value })
                    }
                    className="border p-2 w-full mb-2"
                  />
                  <button
                    onClick={updatePembeli}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pembeli;
