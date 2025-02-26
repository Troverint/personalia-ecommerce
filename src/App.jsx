import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Homepage from "./Homepage";
import Starting from "./components/Starting";
import ProductPage from "./components/Product/ProductPage";
import { Outlet } from "react-router-dom";
import Cart from "./components/content/Cart";
import Sidebar from "./admincomp/Sidebar";
import Dashboard from "./admincomp/Dashboard/Dashboard";
import Pembeli from "./admincomp/Pembeli/Pembeli";
import Product from "./admincomp/Product/Product";
import Profile from "./components/Profile";
import CategoryPage from "./components/content/CategoryPage";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );           
}
function LayoutAdmin() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}



function App() {
  return (
    <Router basename="/personalia-ecommerce/">
      <Routes>
        {/* Rute tanpa Navbar */}
        <Route path="/" element={<Starting />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar />} />

        {/* Rute dengan Navbar */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Homepage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="/user/cart" element={<Cart/>}/>
          <Route path="/user/profile" element={<Profile/>}/>
          <Route path="/category/:name" element={<CategoryPage/>}/>
        </Route>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/pembeli" element={<Pembeli/>}/>
          <Route path="/admin/product" element={<Product/>}/>
        {/* <Route element={<LayoutAdmin />}>

        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
