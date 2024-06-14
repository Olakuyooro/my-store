import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

interface MobileMenuProps {
    isOpen: boolean;
    onToggle: () => void;
  }
  
  export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle }) => (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={onToggle}></div>
      )}
      <div className={`bg-white md:hidden shadow-2xl w-44 h-screen p-2 absolute top-[-2rem] left-[-1.5rem] transition-transform duration-300 ease-in-out z-20 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <IoMdClose className="text-lg cursor-pointer mb-4" onClick={onToggle} />
        <nav className="flex flex-col space-y-3">
          <Link to="/" className="text-GrayishBlue opacity-70 hover:text-VeryDarkBlue hover:opacity-100">
            Collection
          </Link>
          <Link to="/categories/men" className="text-GrayishBlue opacity-70 hover:text-VeryDarkBlue hover:opacity-100">
            Men
          </Link>
          <Link to="/categories/women" className="text-GrayishBlue opacity-70 hover:text-VeryDarkBlue hover:opacity-100">
            Women
          </Link>
        </nav>
      </div>
    </>
  );