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
    navigate('/')
    dispatch(clearCart())

  };

  return (
    <div className="p-4">
      <div className="flex flexrow space-x-6">
        <FaArrowLeft className="text-3xl mt-6 cursor-pointer" onClick={() => navigate(-1)} />
        <h2 className="text-4xl my-4">Checkout</h2>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {cart.map((item, index) => (
          <div className="" key={index}>
            <div className="">
              <p className="text-xs">{item.title}</p>
              <p className="text-red-400 text-xs my-3">
              ₦{(parseFloat(item.price) * item.quantity).toFixed(2)}
              </p>
              <img className="w-8" src={item.image} alt={item.title} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-green-400 my-6">Total sum: ₦{totalSum.toFixed(2)}</p>
      <PaystackButton
        amount={totalSum}
        email={"pabloalabanza9@gmail.com"}
        onSuccess={handlePaymentSuccess}
        onClose={() => console.log("Payment closed.")}
      />
    </div>
  );
};

export default CheckOut;
