"use client";

import { useState, useRef } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const products: Product[] = [
  { id: 1, name: "Red Roses Bouquet", price: 20, image: "/rose1.jpg" },
  { id: 2, name: "Pink Roses Bouquet", price: 18, image: "/rose2.jpg" },
  { id: 3, name: "White Roses Bouquet", price: 22, image: "/rose3.jpg" },
];

export default function Home() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({
    nume: "",
    telefon: "",
    judet: "",
    localitate: "",
    strada: "",
    numar: "",
    codPostal: "",
  });

  const checkoutRef = useRef<HTMLDivElement>(null);

  // Track quantity for each product
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const handleOrder = () => {
    alert(
      `Thank you, ${form.nume}! We will contact you at ${form.telefon} to confirm your order.`
    );
    setCart([]);
    setCheckout(false);
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

  const scrollToCheckout = () => {
    setCheckout(true);
    setTimeout(() => {
      checkoutRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-pink-50 font-sans">
      {/* Company Name Header */}
      <header className="w-full bg-pink-200 py-8">
        <h1 className="text-5xl font-bold text-red-700 text-center">
          Eternal Roses
        </h1>
      </header>

      {/* Hero Section with Video */}
      <section className="relative w-full flex justify-center overflow-hidden">
        {/* Video at original size */}
        <video
          className="z-0"
          autoPlay
          loop
          muted
          playsInline
          width={1680}  // original width
          height={480}  // original height
          src="/rose-video.mp4"
        />

        {/* Overlay for text */}
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-40 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
            Din inima naturii, în ghiveciul tău
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white text-center">
            Frumusețe născută în grădina noastră
          </p>
        </div>
      </section>


      {/* Products Section */}
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
              <h3 className="text-xl font-semibold text-red-700 mb-2">{product.name}</h3>
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
                onClick={() => addToCart(product, quantities[product.id])}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Section */}
      <section className="py-16 px-8 bg-red-50">
        <h2 className="text-3xl font-bold text-center mb-8 text-red-700">
          Coșul tău
        </h2>
        {cart.length === 0 && <p className="text-center text-red-900">Coșul tău este gol.</p>}
        {cart.length > 0 && (
          <div className="max-w-xl mx-auto">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-center bg-white p-4 rounded mb-4 shadow"
              >
                <div>
                  <h3 className="font-semibold text-red-700">{item.product.name}</h3>
                  <p className="text-red-900">
                    ${item.product.price} x {item.quantity}
                  </p>
                </div>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => removeFromCart(item.product.id)}
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
        <section ref={checkoutRef} className="py-16 px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-red-700">
            Finalizare comandă
          </h2>
          <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <label className="block mb-4 text-red-700">
              Nume:
              <input
                type="text"
                name="nume"
                value={form.nume}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded text-black"
              />
            </label>
            <label className="block mb-4 text-red-700">
              Telefon:
              <input
                type="text"
                name="telefon"
                value={form.telefon}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded text-black"
              />
            </label>
            <label className="block mb-4 text-red-700">
              Județul:
              <input
                type="text"
                name="judet"
                value={form.judet}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded text-black"
              />
            </label>
            <label className="block mb-4 text-red-700">
              Localitatea:
              <input
                type="text"
                name="localitate"
                value={form.localitate}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded text-black"
              />
            </label>
            <label className="block mb-4 text-red-700">
              Strada:
              <input
                type="text"
                name="strada"
                value={form.strada}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded text-black"
              />
            </label>
            <label className="block mb-4 text-red-700">
              Numărul:
              <input
                type="text"
                name="numar"
                value={form.numar}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded text-black"
              />
            </label>
            <label className="block mb-4 text-red-700">
              Cod poștal:
              <input
                type="text"
                name="codPostal"
                value={form.codPostal}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded text-black"
              />
            </label>
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
