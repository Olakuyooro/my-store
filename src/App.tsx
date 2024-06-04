import Men from "./components/Categories/Men";
import Women from "./components/Categories/Women";
import CheckOut from "./components/Checkout";
import LandingPage from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./components/Products/productDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp/signup";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/categories/men" element={<Men/>}/>
      <Route path="/categories/women" element={<Women/>}/>
      <Route path="/checkout" element={<CheckOut/>}/>
      <Route path="/product-detail/:id" element={<ProductDetails/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  );
};

export default App;
