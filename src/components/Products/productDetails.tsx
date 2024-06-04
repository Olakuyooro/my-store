import { useParams } from "react-router-dom";
import { FetchAllProducts } from "../../helper/api/product/get-all-products";
import { useQuery } from "@tanstack/react-query";
import Layout from "../Layout/layout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { addToCart } from "../../state/cart/cartSlice";

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

  const [selectedQuantities, setSelectedQuantities] = useState<{
    [key: number]: number;
  }>({});

  const updateQuantityLocal = (productId: number, delta: number) => {
    setSelectedQuantities((prevState) => {
      const newQuantity = (prevState[productId] || 0) + delta;
      if (newQuantity < 0) {
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
  };

  return (
    <Layout>
      <div className="p-6 ml-12">
        <p>{filteredProduct.title}</p>
        <img className="w-32" src={filteredProduct.image} />
        <div className="flex space-x-5 my-2">
          <button
            className="bg-black flex justify-center items-center text-white text-center p-1 h-4 "
            onClick={() => updateQuantityLocal(filteredProduct.id, -1)}
          >
            -
          </button>
          <button
            className="bg-black flex justify-center items-center text-white text-center p-1 h-4 "
            onClick={() => updateQuantityLocal(filteredProduct.id, 1)}
          >
            +
          </button>
        </div>
        <p className="my-2 text-sm">Quantity selected: {selectedQuantities[filteredProduct.id] || 1}</p>
        <button
          onClick={() => handleAddToCart(filteredProduct)}
          className="bg-black text-xs text-white rounded-md p-2"
        >
          Add to cart
        </button>
      </div>
    </Layout>
  );
};

export default ProductDetails;
