import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import PaystackButton from "./PaystackButton";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { clearCart } from "../../state/cart/cartSlice";

const CheckOut = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const totalSum = cart.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePaymentSuccess = (response: any) => {
    console.log("Payment successful! Transaction ID:", response.reference);
    navigate('/');
    dispatch(clearCart());
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => navigate(-1)} />
        <h2 className="text-3xl font-semibold">Checkout</h2>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {cart.map((item, index) => (
            <div className="flex items-center space-x-4" key={index}>
              <img className="w-16 h-16 object-cover rounded" src={item.image} alt={item.title} />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-red-500 text-sm mt-1">
                  ₦{(parseFloat(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center border-t pt-4">
          <p className="text-lg font-medium">Total: <span className="text-green-500">₦{totalSum.toFixed(2)}</span></p>
          <PaystackButton
            amount={totalSum}
            email={"pabloalabanza9@gmail.com"}
            onSuccess={handlePaymentSuccess}
            onClose={() => console.log("Payment closed.")}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
