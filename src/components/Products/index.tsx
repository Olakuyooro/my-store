// components/App.tsx
import { useQuery } from "@tanstack/react-query";
import Layout from "../../components/Layout/layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { addToCart } from "../../state/cart/cartSlice";
import { FetchAllProducts } from "../../helper/api/product/get-all-products";
import { useState } from "react";
import { Link } from "react-router-dom";

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

  //   const cart = useSelector((state: RootState) => state.cart.items);
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

  const filteredProducts = products.filter(
    (product: Product) => product.category === type
  );

  return (
    <Layout>
      <div className="grid grid-cols-5 gap-6 p-7">
        {/* <div>
          {cart.map((item, index) => (
            <div key={index}>
              <p>{item.title}</p>
              <img src={item.image} alt={item.title} />
              <p>{item.quantity}</p>
            </div>
          ))}
        </div> */}
        {filteredProducts.map((product) => (
          <div
            className="w-56 border p-2 cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:ease-in hover:delay-75"
            key={product.id}
          >
            <div className="flex flex-col justify-center items-center">
              <Link to={`/product-detail/${product.id}`}>
                <img
                  className="w-32 h-44"
                  src={product.image}
                  alt={product.title}
                />
              </Link>
              <div className="text-center text-xs my-2">{product.title}</div>
              <p>${product.price}</p>
              <p>Quantity selected: {selectedQuantities[product.id] || 0}</p>
              <div className="flex space-x-5">
                <button onClick={() => updateQuantityLocal(product.id, -1)}>
                  -
                </button>
                <button onClick={() => updateQuantityLocal(product.id, 1)}>
                  +
                </button>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-black text-xs text-white rounded-md p-2"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductsPage;
