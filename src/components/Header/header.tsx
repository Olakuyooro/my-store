import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import { MdMenu, MdOutlineDelete } from "react-icons/md";
import { removeItem } from "../../state/cart/cartSlice";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const [cartState, setCartState] = useState(false);
  const totalSum = cart.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              {isMenuOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-10"
                  onClick={handleMenu}
                ></div>
              )}
              <div
                className={`bg-white shadow-2xl w-44 h-screen p-2 absolute top-[-2rem] left-[-1.5rem] transition-transform duration-300 ease-in-out z-20 ${
                  isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <IoMdClose
                  className="text-lg cursor-pointer mb-4"
                  onClick={handleMenu}
                />
               <section className="flex flex-col space-y-3">
               <Link
              className="text-GrayishBlue opacity-70  hover:text-VeryDarkBlue hover:opacity-100"
              to="/"
            >
              Collection
            </Link>
            <Link
              className="text-GrayishBlue opacity-70 hover:text-VeryDarkBlue hover:opacity-100"
              to="/categories/men"
            >
              Men
            </Link>
            <Link
              className="text-GrayishBlue opacity-70  hover:text-VeryDarkBlue hover:opacity-100"
              to="/categories/women"
            >
              Women
            </Link>
               </section>

              </div>
            </div>

            <img src={logo} alt=""></img>
          </div>

          <ul className="hidden md:block space-x-5 text-sm mt-4 font-semibold">
            <Link
              className="text-GrayishBlue opacity-70  hover:text-VeryDarkBlue hover:opacity-100"
              to="/"
            >
              Collection
            </Link>
            <Link
              className="text-GrayishBlue opacity-70 hover:text-VeryDarkBlue hover:opacity-100"
              to="/categories/men"
            >
              Men
            </Link>
            <Link
              className="text-GrayishBlue opacity-70  hover:text-VeryDarkBlue hover:opacity-100"
              to="/categories/women"
            >
              Women
            </Link>
          </ul>
        </section>

        <div className="pt-4 flex space-x-6">
          {/* <FaUser /> */}
          <div>
            <FaCartShopping
              className="relative cursor-pointer"
              onClick={() => setCartState(!cartState)}
            />
            <p className="absolute top-5 right-9 flex justify-center items-center bg-black text-white w-4 h-4 text-[0.5rem] text-center rounded-full p-1">
              {cart.length}
            </p>
            {cartState && (
              <div className="w-64 p-4 absolute z-10 top-10 right-12 bg-gray-100 rounded-md shadow-lg">
                {cart.map((item, index) => (
                  <div className="" key={index}>
                    <div className="flex justify-between">
                      <p className="text-xs w-24">
                        {item.title} x {item.quantity}
                      </p>
                      <MdOutlineDelete
                        onClick={() => dispatch(removeItem(item.id))}
                      />
                    </div>
                    <p className="text-red-400 text-sm mt-2">
                      ₦{parseFloat(item.price) * item.quantity}
                    </p>
                    <img className="w-4" src={item.image} alt={item.title} />
                  </div>
                ))}
                <p className="text-green-400 text-sm mt-2">
                  Total sum: ₦{totalSum.toFixed(2)}
                </p>
                <Link
                  to="/checkout"
                  className="bg-black text-xs text-white p-1 rounded-md mt-4"
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <hr className="hidden md:flex w-[90%] mt-8 "></hr>
      </div>
    </div>
  );
};

export default Header;
