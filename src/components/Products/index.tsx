import { useQuery } from "@tanstack/react-query";
import Layout from "../../components/Layout/layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { addToCart } from "../../state/cart/cartSlice";
import { FetchAllProducts } from "../../helper/api/product/get-all-products";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type Product = {
  id: number;
  title: string;
  image: string;
  price: string;
  category: string;
};

interface ProductsPageProps {
  type: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ type }) => {
  const { data = [] } = useQuery({
    queryKey: ["products"],
    queryFn: FetchAllProducts,
  });

  const products: Product[] = data;
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

  const filteredProducts = products.filter(
    (product: Product) => product.category === type
  );

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4 sm:p-8">
        {filteredProducts.map((product) => (
          <div
            className="border border-gray-300 rounded-lg p-4 shadow-md transform transition-transform hover:scale-105"
            key={product.id}
          >
            <div className="flex flex-col items-center">
              <Link to={`/product-detail/${product.id}`}>
                <img
                  className="w-24 h-32 sm:w-32 sm:h-44 object-cover rounded-md mb-4"
                  src={product.image}
                  alt={product.title}
                />
              </Link>
              <div className="text-center text-sm font-medium mb-2">
                {product.title}
              </div>
              <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                ₦{product.price}
              </p>
              <p className="text-xs sm:text-sm mb-2">
                Quantity selected: {selectedQuantities[product.id] || 1}
              </p>
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => updateQuantityLocal(product.id, -1)}
                  className="bg-gray-200 text-gray-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex justify-center items-center hover:bg-gray-300"
                >
                  -
                </button>
                <button
                  onClick={() => updateQuantityLocal(product.id, 1)}
                  className="bg-gray-200 text-gray-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex justify-center items-center hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-black text-white rounded-md px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:opacity-60 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer/>
    </Layout>
  );
};

export default ProductsPage;
