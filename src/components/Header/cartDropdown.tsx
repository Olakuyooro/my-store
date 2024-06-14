import { Link } from "react-router-dom";
import { CartItem } from "./cartItem";

interface CartItemType {
    id: number;
    title: string;
    price: string;
    quantity: number;
    image: string;
}

interface CartDropdownProps {
    cart: CartItemType[];
    totalSum: number;
    onRemove: (id: number) => void;
}

export const CartDropdown: React.FC<CartDropdownProps> = ({ cart, totalSum, onRemove }) => (
    <div className="w-72 p-6 absolute z-10 top-12 right-12 bg-white rounded-lg shadow-xl">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Shopping Cart</h2>
        {cart.length > 0 ? (
            <>
                <ul className="space-y-4">
                    {cart.map((item, index) => (
                        <CartItem key={index} item={item} onRemove={onRemove} />
                    ))}
                </ul>
                <div className="border-t border-gray-200 mt-4 pt-4">
                    <p className="text-lg font-medium text-gray-700">
                        Total: <span className="text-green-500">₦{totalSum.toFixed(2)}</span>
                    </p>
                </div>
                <Link 
                    to="/checkout" 
                    className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2 px-4 rounded-md mt-6 block text-center transition-colors duration-200"
                >
                    Proceed to Checkout
                </Link>
            </>
        ) : (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
        )}
    </div>
);
