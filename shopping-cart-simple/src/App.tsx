import { useState } from "react";
import Cart from "../src/components/Cart";
import Header from "../src/components/Header";
import ProductList from "../src/components/ProductList";

type Product = {
  id: number;
  name: string;
  price: number;
};

type CartItem = Product & {
  quantity: number;
};

const App = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [{ ...product, quantity: 1 }, ...prevCartItems];
      }
    });
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  function increaseQuantity(productId: number) {
    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
  }

  function decreaseQuantity(productId: number) {
    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  }
  function removeFromCart(productId: number) {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => item.id !== productId);
    });
  }

  return (
    <div className="flex flex-col gap-4 p-6 text-white">
      <Header totalItems={totalItems} />

      <main className="flex flex-col justify-between gap-4 md:flex-row">
        <ProductList addToCartProps={addToCart} />
        <Cart
          cartItems={cartItems}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
        />
      </main>
    </div>
  );
};

export default App;
