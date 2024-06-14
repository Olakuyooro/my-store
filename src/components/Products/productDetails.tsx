import { useParams } from "react-router-dom";
import { FetchAllProducts } from "../../helper/api/product/get-all-products";
import { useQuery } from "@tanstack/react-query";
import Layout from "../Layout/layout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { addToCart } from "../../state/cart/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Product = {
  id: number;
  title: string;
  image: string;
  price: string;
};

const ProductDetails = () => {
  const { id } = useParams();
  const { data = [] } = useQuery({
    queryKey: ["products"],
    queryFn: FetchAllProducts,
  });

  const filteredProduct = data.find(
    (product: Product) => product.id === Number(id)
  );
  const dispatch = useDispatch<AppDispatch>();
  const notify = () => toast.success("Item Added");


  const [selectedQuantities, setSelectedQuantities] = useState<{
    [key: number]: number;
  }>({});

  const updateQuantityLocal = (productId: number, delta: number) => {
    setSelectedQuantities((prevState) => {
      const newQuantity = (prevState[productId] || 0) + delta;
      if (newQuantity < 1) {
        return prevState;
      }
      return {
        ...prevState,
        [productId]: newQuantity,
      };
    });
  };

  const handleAddToCart = (product: Product) => {
    const quantity = selectedQuantities[product.id] || 1;
    dispatch(addToCart({ ...product, quantity }));
    notify()
  };

  if (!filteredProduct) {
    return (
      <Layout>
        <div className="p-6">
          <p className="text-lg text-red-500">Product not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <img
            className="w-64 h-64 object-cover rounded-md shadow-md mb-4 md:mb-0"
            src={filteredProduct.image}
            alt={filteredProduct.title}
          />
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl font-semibold mb-2">{filteredProduct.title}</h1>
            <p className="text-lg font-medium text-gray-700 mb-4">₦{filteredProduct.price}</p>
            <div className="flex items-center space-x-3 mb-4">
              <button
                className="bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
                onClick={() => updateQuantityLocal(filteredProduct.id, -1)}
              >
                -
              </button>
              <span className="text-lg">{selectedQuantities[filteredProduct.id] || 1}</span>
              <button
                className="bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
                onClick={() => updateQuantityLocal(filteredProduct.id, 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={() => handleAddToCart(filteredProduct)}
              className="bg-black text-white rounded-md py-2 px-4 text-sm font-medium hover:opacity-60 transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </Layout>
  );
};

export default ProductDetails;
