import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import { MdMenu} from "react-icons/md";
import { removeItem } from "../../state/cart/cartSlice";
import { MobileMenu } from "./mobileMenu";
import { CartDropdown } from "./cartDropdown";


const Header = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const [cartState, setCartState] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalSum = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <div className="flex pr-12 md:px-12 py-4 justify-between">
        <section className="flex space-x-32">
          <div className="md:w-32 mt-4 ml-6 flex relative">
            <div onClick={handleMenu}>
              {!isMenuOpen && <MdMenu className="md:hidden text-lg mr-4" />}
            </div>
            <MobileMenu isOpen={isMenuOpen} onToggle={handleMenu} />
            <img src={logo} alt="Company Logo" />
          </div>
          <ul className="hidden md:flex space-x-5 text-sm mt-4 font-semibold">
            <li>
              <Link to="/" className="text-GrayishBlue opacity-70 hover:text-VeryDarkBlue hover:opacity-100">
                Collection
              </Link>
            </li>
            <li>
              <Link to="/categories/men" className="text-GrayishBlue opacity-70 hover:text-VeryDarkBlue hover:opacity-100">
                Men
              </Link>
            </li>
            <li>
              <Link to="/categories/women" className="text-GrayishBlue opacity-70 hover:text-VeryDarkBlue hover:opacity-100">
                Women
              </Link>
            </li>
          </ul>
        </section>

        <div className="pt-4 flex space-x-6">
          <div>
            <FaCartShopping className="relative cursor-pointer" onClick={() => setCartState(!cartState)} />
            <p className="absolute top-5 right-9 flex justify-center items-center bg-black text-white w-4 h-4 text-[0.5rem] text-center rounded-full p-1">
              {cart.length}
            </p>
            {cartState && <CartDropdown cart={cart} totalSum={totalSum} onRemove={(id:number) => dispatch(removeItem(id))} />}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <hr className="hidden md:flex w-[90%] mt-8" />
      </div>
    </div>
  );
};

export default Header;
