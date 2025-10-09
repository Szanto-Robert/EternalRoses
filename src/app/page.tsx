"use client";

import { useRef, useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import FloatingCartIcon from "./components/FloatingCartIcon";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// Demo products
const products: Product[] = [
  { id: 1, name: "Red Roses Bouquet", price: 20, image: "/rose1.jpg" },
  { id: 2, name: "Pink Roses Bouquet", price: 18, image: "/rose2.jpg" },
  { id: 3, name: "White Roses Bouquet", price: 22, image: "/rose3.jpg" },
];

// 🧩 Main component that uses the Cart Context
function HomeContent() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { checkout, setCheckout } = useCart();
  const [form, setForm] = useState({
    nume: "",
    telefon: "",
    judet: "",
    localitate: "",
    strada: "",
    numar: "",
    codPostal: "",
  });
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );

  const checkoutRef = useRef<HTMLDivElement>(null);

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const handleOrder = () => {
    alert(
      `Mulțumim, ${form.nume}! Te vom contacta la ${form.telefon} pentru confirmarea comenzii.`
    );
    setForm({
      nume: "",
      telefon: "",
      judet: "",
      localitate: "",
      strada: "",
      numar: "",
      codPostal: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const scrollToCheckout = () => {
    setCheckout(true);
    setTimeout(() => {
      checkoutRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <main className="min-h-screen bg-pink-50 font-sans">
      {/* Header */}
      <header className="w-full bg-pink-200 py-8">
        <h1 className="text-5xl font-bold text-red-700 text-center">
          Eternal Roses
        </h1>
      </header>

      {/* Hero Section */}
      <section className="relative w-full flex justify-center overflow-hidden">
        <video
          className="z-0"
          autoPlay
          loop
          muted
          playsInline
          width={1680}
          height={480}
          src="/rose-video.mp4"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-40 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
            Din inima naturii, în ghiveciul tău
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white text-center">
            Frumusețe născută în grădina noastră
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="pt-12 pb-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-red-700">
          Alege trandafirul perfect pentru casa ta
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="mx-auto mb-4 rounded-lg h-48 object-cover"
              />
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                {product.name}
              </h3>
              <p className="text-red-900 font-bold mb-4">${product.price}</p>

              {/* Quantity input */}
              <div className="flex justify-center items-center mb-4">
                <input
                  type="number"
                  min={1}
                  value={quantities[product.id]}
                  onChange={(e) =>
                    handleQuantityChange(product.id, Number(e.target.value))
                  }
                  className="w-16 p-1 border rounded text-center mr-2 text-black bg-white"
                />
                <span className="text-black">pcs</span>
              </div>

              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={() =>
                  addToCart({
                    ...product,
                    quantity: quantities[product.id],
                  })
                }

              >
                Adaugă în coș
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Section */}
      <section id="cart-summary" className="py-16 px-8 bg-red-50">
        <h2 className="text-3xl font-bold text-center mb-8 text-red-700">
          Coșul tău
        </h2>
        {cartItems.length === 0 && (
          <p className="text-center text-red-900">Coșul tău este gol.</p>
        )}
        {cartItems.length > 0 && (
          <div className="max-w-xl mx-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded mb-4 shadow"
              >
                <div>
                  <h3 className="font-semibold text-red-700">
                    {item.name}
                  </h3>
                  <p className="text-red-900">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => removeFromCart(item.id)}
                >
                  Șterge
                </button>
              </div>
            ))}
            <button
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              onClick={scrollToCheckout}
            >
              Finalizează comanda
            </button>
          </div>
        )}
      </section>

      {/* Checkout Form */}
      {checkout && (
        <section ref={checkoutRef} id="finalizare-comanda" className="py-16 px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-700">
            Finalizare comandă
          </h2>
          <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            {Object.entries(form).map(([key, value]) => (
              <label
                key={key}
                className="block mb-4 text-red-700 capitalize"
              >
                {key}:
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border rounded text-black"
                />
              </label>
            ))}
            <button
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              onClick={handleOrder}
            >
              Plasează comanda
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

// 🛍 Wrap the app with CartProvider
export default function Home() {
  return (
    <CartProvider>
      <HomeContent />
      <FloatingCartIcon />
    </CartProvider>
  );
}
