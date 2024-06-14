import { MdOutlineDelete } from "react-icons/md";

interface CartItemType {
    id: number;
    title: string;
    price: string;
    quantity: number;
    image: string;
  }
  
interface CartItemProps {
    item: CartItemType;
    onRemove: (id: number) => void;
  }
export const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) =>  (
    <div className="flex justify-between mb-2">
      <div>
        <p className="text-xs w-24">
          {item.title} x {item.quantity}
        </p>
        <p className="text-red-400 text-sm mt-2">
          ₦{parseFloat(item.price) * item.quantity}
        </p>
      </div>
      <div>
        <MdOutlineDelete
          className="cursor-pointer"
          onClick={() => onRemove(item.id)}
        />
        <img className="w-4 mt-2" src={item.image} alt={item.title} />
      </div>
    </div>
  );
  