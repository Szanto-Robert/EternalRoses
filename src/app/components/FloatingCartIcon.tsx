"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function FloatingCartIcon() {
  const { cartItems, checkout, setCheckout } = useCart();

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const handleClick = () => {
    const section = document.getElementById("cart-summary");
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
    };


  if (itemCount === 0) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-700 transition"
    >
      <div className="relative">
        <ShoppingCart size={24} />
        <span className="absolute -top-2 -right-2 bg-white text-pink-600 text-xs font-bold rounded-full px-2">
          {itemCount}
        </span>
      </div>
    </button>
  );
}
