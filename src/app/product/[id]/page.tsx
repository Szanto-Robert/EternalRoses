"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, CartProvider } from "../../context/CartContext";
import { products } from "../../page";

export default function ProductPageWrapper({ params }: { params: { id: string } }) {
  return (
    <CartProvider>
      <ProductPageInner params={params} />
    </CartProvider>
  );
}

function ProductPageInner({ params }: { params: { id: string } | Promise<{ id: string }> }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const resolvedParams = params instanceof Promise ? React.use(params) : params;
  const product = products.find((p) => p.id === Number(resolvedParams.id));
  const [quantity, setQuantity] = useState(1);
  const [mainImgIdx, setMainImgIdx] = useState(0);

  if (!product) {
    return <div className="p-8 text-center">Produsul nu a fost găsit.</div>;
  }

  return (
    <main className="min-h-screen bg-pink-50 font-sans flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        <div className="flex flex-col items-center mb-6">
          <img
            src={product.images[mainImgIdx]}
            alt={product.name}
            className="mb-4 rounded-lg h-80 object-cover border-2 border-red-200"
            style={{ maxWidth: "100%" }}
          />
          <div className="flex gap-2 justify-center">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={product.name + " thumbnail " + (idx + 1)}
                className={`rounded h-16 w-16 object-cover cursor-pointer border-2 ${mainImgIdx === idx ? "border-red-600" : "border-transparent"}`}
                onClick={() => setMainImgIdx(idx)}
              />
            ))}
          </div>
        </div>
        <h1 className="text-3xl font-bold text-red-700 mb-2 text-center">{product.name}</h1>
        <div className="flex justify-center items-center gap-4 mb-2">
          <p className="text-gray-500 line-through text-lg">{product.originalPrice} lei</p>
          <p className="text-red-900 font-bold text-2xl">{product.promoPrice} lei</p>
        </div>
        <div className="mb-6 p-4 bg-pink-100 rounded text-gray-700 text-center">
          {product.description}
        </div>
        <div className="flex justify-center items-center mb-4 gap-2">
          <button
            className="bg-red-200 text-red-700 px-3 py-1 rounded text-xl font-bold hover:bg-red-300"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Scade cantitatea"
          >
            −
          </button>
          <span className="w-12 text-center text-lg font-semibold text-black">{quantity}</span>
          <button
            className="bg-red-200 text-red-700 px-3 py-1 rounded text-xl font-bold hover:bg-red-300"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Crește cantitatea"
          >
            +
          </button>
          <span className="text-black">buc</span>
        </div>
        <button
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition mb-2 text-lg font-bold"
          onClick={() => {
            addToCart({
              id: product.id,
              name: product.name,
              price: product.promoPrice,
              quantity,
              image: product.images[mainImgIdx],
              originalPrice: product.originalPrice,
              promoPrice: product.promoPrice,
            });
            router.push("/");
          }}
        >
          Adaugá în coșul tău
        </button>
        <button
          className="w-full bg-gray-200 text-red-700 py-2 rounded hover:bg-gray-300 transition"
          onClick={() => router.back()}
        >
          Înapoi
        </button>
      </div>
    </main>
  );
}
