import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import Category from "../../components/content/Category";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 4;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");

  const [Category, setCategory] = useState([]);
  const [CategoryId, setCategoryId] = useState("");
  const [stocks, setStocks] = useState([{ size: "", quantity: 0 }]); 

  useEffect(() => {
    getProduct();
    getCategory();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product");
      setProduct(response.data);
    } catch (error) {
      console.error("Gagal mengambil produk:", error.message);
    }
  };

  const getCategory = async () => {
    try {
      const responseCategory = await axios.get(
        "http://localhost:3000/category"
      );
      setCategory(responseCategory.data);
      console.log(responseCategory.data);
    } catch (error) {
      console.log(responseCategory.data.msg);
    }
  };
  const indexOfLastCustomer = currentPage * productPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - productPerPage;
  const currentProduct = product.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const totalPages = Math.ceil(product.length / productPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const postPembeli = async () => {
    try {
      
      const response = await axios.post("http://localhost:3000/product/post", {
        name,
        description,
        price,
        rating,
        image,
        CategoryId,
        stock: stocks,
      }
      );
      alert("Produk berhasil dibuat:", response.data);
      setModal(false);
      getProduct();
    } catch (error) {
      console.error(
        "Gagal menambahkan produk:",
        error.response?.data || error.message
      );
    }
  };

  const addStock = () => {
    setStocks([...stocks, { size: "", quantity: 0 }]);
  };

  const handleStockChange = (index, field, value) => {
    const newStocks = [...stocks];
    newStocks[index][field] = value;
    setStocks(newStocks);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/product/delete/${id}`);
      getProduct();
    } catch (error) {}
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex justify-center h-screen ">
        <div className="w-[90%] h-full flex flex-col justify-center">
          <div className="">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-3xl font-poppins">Product</h1>
              <div
                className="flex justify-center items-center border-2 px-3 py-2 rounded font-semibold cursor-pointer"
                onClick={() => setModal(true)}
              >
                <FaPlus className="mr-2" />
                <button>Add a product</button>
              </div>
            </div>
          </div>

          <div className="w-full mt-3 border-2 border-[#474448] rounded-md ">
            <table className="min-w-full p-3 shadow-xl rounded-md text-[#474448] font-bold border-none">
              <thead>
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2 border-x">Image</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2 border-x">Price</th>
                  <th className="px-4 py-2">Rating</th>
                  <th className="px-4 py-2 border-x">Stock</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentProduct.map((o, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 border text-center">{i + 1}</td>
                    <td className=" border text-center flex py-3 justify-center items-center">
                      <img
                        src={o.image}
                        alt={o.name}
                        className="w-[60px] h-[64px] border-3 border-[#000000] rounded-lg mb-1"
                      />
                    </td>
                    <td className="px-4 py-2 border text-center">{o.name}</td>
                    <td className="px-4 py-2 border text-center">{o.price}</td>
                    <td className="px-4 py-2 border text-center">
                      {o.rating || 0}
                    </td>
                    <td className="px-4 py-2 border text-center">
                    {o.Stocks?.reduce((total, stock) => total + stock.quantity, 0) || 0}

                    </td>
                    <td className="px-2 py-1 border text-center">
                      <button
                        onClick={() => deleteProduct(o.id)}
                        className="bg-amber-600 text-white px-4 py-1 rounded-md"
                      >
                        Delete
                      </button>
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
                  currentPage === i + 1 ? "bg-gray-500 text-white" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {modal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
              <div className="bg-white p-6 rounded-md w-[550px] border-2 flex flex-col justify-center">
                <h2 className="text-xl font-semibold mb-4">Post Product</h2>
                <div className="flex grow justify-center gap-20">
                  <div className="">
                    <div className="flex flex-col  w-full">
                      <label htmlFor="">Nama Product</label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 mb-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="">Deskripsi</label>
                      <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 mb-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="">Harga</label>
                      <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border p-2  mb-2"
                      />
                    </div>
                  </div>

                  <div className="">
                    <div className="flex flex-col">
                      <label htmlFor="">Photo</label>
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="border p-2 mb-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="">Category</label>
                      <select
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={CategoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                      >
                        <option value="">Pilih Category</option>
                        {Category.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.category_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="flex flex-col mb-3">
                    <label>Ukuran</label>
                    {stocks.map((stock, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Size"
                          value={stock.size}
                          onChange={(e) =>
                            handleStockChange(index, "size", e.target.value)
                          }
                          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <input
                          type="number"
                          placeholder="Stock"
                          value={stock.quantity}
                          onChange={(e) =>
                            handleStockChange(index, "quantity", e.target.value)
                          }
                          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <button
                          onClick={addStock}
                          className="bg-gray-300 px-2 py-1 my-2"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="">
                  <button
                    onClick={postPembeli}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Post
                  </button>
                  <button
                    onClick={() => setModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
