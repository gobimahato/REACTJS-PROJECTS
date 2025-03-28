import { Minus, Plus, TrashIcon } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

export default function Cart({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}: CartProps) {
  console.log(cartItems);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="w-full rounded-lg bg-gray-800 p-6 md:w-1/2">
      <h2 className="mb-4 text-xl font-semibold">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="my-4 text-gray-400">Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="mb-4 flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-gray-400">
                  ${item.price} x {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2 *:transition-colors">
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="rounded bg-green-600 px-3 py-2 font-bold text-white hover:bg-green-700"
                >
                  <Plus className="h-4 w-4" />
                </button>

                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="rounded bg-yellow-600 px-3 py-2 font-bold text-white hover:bg-yellow-700"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded bg-red-600 px-3 py-2 font-bold text-white hover:bg-red-700"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>

              <p className="text-lg p-2 font-semibold text-blue-400 w-12 text-right">
                ${item.price * item.quantity}
              </p>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-lg font-bold">Total: ${total}</h3>
    </div>
  );
}
