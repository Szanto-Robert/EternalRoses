"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./context/CartContext";
import FloatingCartIcon from "./components/FloatingCartIcon";

export type Product = {
  id: number;
  name: string;
  originalPrice: number;
  promoPrice: number;
  images: string[];
  description: string;
};

// All rose varieties with Wikipedia-based descriptions
export const products: Product[] = [
  { id: 1, name: "Grand Gala", originalPrice: 50, promoPrice: 25, images: ["/Grand-Gala.jpg","/Grand-Gala2.jpg"], description: "Grand Gala este un trandafir hibrid de ceai, cu flori mari, roșu intens și petale catifelate. Ideal pentru grădini elegante." },
  { id: 2, name: "Rumba", originalPrice: 40, promoPrice: 25, images: ["/Rumba.jpg","/Rumba2.jpg"], description: "Rumba este un trandafir floribunda cu petale galbene și roșii, flori mici spre medii în buchete. Culoare vie și creștere compactă." },
  { id: 3, name: "Double Delight", originalPrice: 45, promoPrice: 25, images: ["/DoubleDelight.jpg","/DoubleDelight2.jpg"], description: "Double Delight este un trandafir hibrid de ceai, cu petale crem cu margini roșii și parfum intens. Florile sunt mari și atrăgătoare." },
  { id: 4, name: "Keiro", originalPrice: 30, promoPrice: 25, images: ["/Keiro.jpg","/Keiro2.jpg"], description: "Keiro este un trandafir cu petale portocalii-galbene și formă compactă. Florile sunt medii și aduc căldură grădinii." },
  { id: 5, name: "Jalitah", originalPrice: 35, promoPrice: 25, images: ["/Jalitah.jpg","/Jalitah2.jpg"], description: "Jalitah este un trandafir cu petale roz pal și aspect delicat. Florile sunt medii, ideale pentru decor." },
  { id: 6, name: "Diamond Design", originalPrice: 40, promoPrice: 25, images: ["/DiamondDesign.jpg","/DiamondDesign2.jpg"], description: "Diamond Design este un trandafir modern cu petale albe și crem, flori elegante de dimensiune medie. Apreciat pentru puritate și frumusețe." },
  { id: 7, name: "Maria Theresia", originalPrice: 50, promoPrice: 25, images: ["/MariaTheresia.jpg","/MariaTheresia2.jpg"], description: "Maria Theresia este un trandafir roz clasic, cu flori mari, parfum delicat și aspect romantic. Perfect pentru buchete." },
  { id: 8, name: "Graham Thomas", originalPrice: 45, promoPrice: 25, images: ["/GrahamThomas.jpg","/GrahamThomas2.jpg"], description: "Graham Thomas este un trandafir englezesc cu petale galbene și parfum intens. Florile sunt medii spre mari, planta viguroasă." },
  { id: 9, name: "Eden Rosen", originalPrice: 45, promoPrice: 25, images: ["/EdenRosen.jpg","/EdenRosen2.jpg"], description: "Eden Rose (Pierre de Ronsard) are flori mari, crem-roz, cu aspect romantic. Este trandafir urcător, ideal pentru pergole." },
  { id: 10, name: "Black Magic", originalPrice: 60, promoPrice: 25, images: ["/BlackMagic.jpg","/BlackMagic2.jpg"], description: "Black Magic este un trandafir hibrid de ceai cu petale roșu închis, flori mari și catifelate. Culoare dramatică, rezistență mare." },
  { id: 11, name: "Lavender", originalPrice: 40, promoPrice: 25, images: ["/Lavender.jpg","/Lavender2.jpg"], description: "Lavender este un trandafir cu petale mov deschis și parfum plăcut. Florile sunt medii, simbolizează misterul și eleganța." },
  { id: 12, name: "Westerland", originalPrice: 55, promoPrice: 25, images: ["/Westerland.jpg","/Westerland2.jpg"], description: "Westerland este un trandafir urcător cu petale portocalii-caise și parfum intens. Flori semi-duble, plantă robustă." },
  { id: 13, name: "Kristal", originalPrice: 45, promoPrice: 25, images: ["/kristal.jpg","/kristal2.jpg"], description: "Kristal este un trandafir alb cu petale pure și flori medii. Folosit la nunți, simbolizează inocența și începuturile noi." },
  { id: 14, name: "Artemis", originalPrice: 50, promoPrice: 25, images: ["/Artemis.jpg","/Artemis2.jpg"], description: "Artemis este un trandafir cu petale alb-crem și creștere bogată. Florile sunt medii, parfum subtil." },
  { id: 15, name: "Sympathie", originalPrice: 52, promoPrice: 25, images: ["/Sympathie.jpg","/Sympathie2.jpg"], description: "Sympathie este un trandafir urcător cu petale roșu intens și flori mari, semi-duble. Viguroasă, ideală pentru garduri." },
  { id: 16, name: "Red Intuition", originalPrice: 48, promoPrice: 25, images: ["/RedIntuition.jpg","/RedIntuition2.jpg"], description: "Red Intuition este un trandafir hibrid de ceai cu petale roșii striate. Florile sunt mari și cu model unic." },
  { id: 17, name: "Osiria", originalPrice: 46, promoPrice: 25, images: ["/Osiria.jpg","/Osiria2.jpg"], description: "Osiria este un trandafir hibrid de ceai cu petale bicolore, roșu exterior și alb interior. Florile sunt mari și parfumate." },
  { id: 18, name: "Black Madona", originalPrice: 53, promoPrice: 25, images: ["/BlackMadona.jpg","/BlackMadona2.jpg"], description: "Black Madona este un trandafir cu petale burgundy și textură catifelată. Florile sunt mari, ideale pentru ocazii speciale." },
  { id: 19, name: "Alinka", originalPrice: 30, promoPrice: 25, images: ["/Alinka.jpg","/Alinka2.jpg"], description: "Alinka este un trandafir cu petale galbene cu margini roșii, flori medii și vesele. Culoare vibrantă, creștere compactă." },
  { id: 20, name: "Remy Martin", originalPrice: 32, promoPrice: 25, images: ["/RemyMartin.jpg","/RemyMartin2.jpg"], description: "Remy Martin este un trandafir cu petale galben-aurii și flori medii. Apreciat pentru culoarea luminoasă." },
  { id: 21, name: "Dulceata de Gem", originalPrice: 39, promoPrice: 25, images: ["/DulceataDeGem.jpg","/DulceataDeGem2.jpg"], description: "Dulceata de Gem este un trandafir cu petale roz și aspect delicat. Florile sunt medii, aduc farmec grădinii." },
  { id: 22, name: "Indigoletta Urcator", originalPrice: 41, promoPrice: 25, images: ["/IndigolettaUrcator.jpg","/IndigolettaUrcator2.jpg"], description: "Indigoletta Urcator este un trandafir urcător cu petale lavandă-albastre și flori medii. Ideal pentru grădini verticale." },
  { id: 23, name: "Red Berlin", originalPrice: 65, promoPrice: 25, images: ["/RedBerlin.jpg","/RedBerlin2.jpg"], description: "Red Berlin este un trandafir hibrid de ceai cu petale roșii aprinse și flori mari, clasice. Culoare vibrantă, creștere puternică." },
  { id: 24, name: "Peace", originalPrice: 45, promoPrice: 25, images: ["/Peace.jpg","/Peace2.jpg"], description: "Peace este un trandafir hibrid de ceai celebru, cu petale galbene cu margini roz. Flori mari, parfumate, simbol al armoniei." },
  { id: 25, name: "Alb Urcator", originalPrice: 45, promoPrice: 25, images: ["/AlbUrcator.jpg","/AlbUrcator2.jpg"], description: "Alb Urcator este un trandafir urcător cu petale albe pure și flori medii. Ideal pentru spații verticale, aduce eleganță grădinii." },
  { id: 26, name: "Golden Showers", originalPrice: 55, promoPrice: 25, images: ["/GoldenShowers.jpg","/GoldenShowers2.jpg"], description: "Golden Showers este un trandafir urcător cu petale galbene aprinse și flori semi-duble. Viguroasă, perfectă pentru garduri și pergole." },
];

function HomeContent() {
  const router = useRouter();
      // Hero carousel state
      const heroItems = [
        {
          type: "video",
          src: "/rose-video.mp4",
          title: "Din inima naturii, în ghiveciul tău",
          subtitle: "Frumusețe născută în grădina noastră",
        },
        {
          type: "image",
          src: "/hero-image.jpg",
          title: "Descoperă colecția noastră unică!",
          subtitle: "Alege trandafirul perfect pentru grădina ta.",
        },
      ];
      const [heroIdx, setHeroIdx] = useState(0);
    // For modal image carousel
    const [modalImageIdx, setModalImageIdx] = useState(0);
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const { checkout, setCheckout } = useCart();
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

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

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [search, setSearch] = useState("");

  const checkoutRef = useRef<HTMLDivElement>(null);

  const handleQuantityChange = (id: number, value: number) => {
    if (value < 1) value = 1;
    setQuantities({ ...quantities, [id]: value });
  };

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      alert("Coșul este gol.");
      return;
    }

    if (!form.nume || !form.telefon || !form.judet || !form.localitate || !form.strada || !form.numar) {
      alert("Completează toate câmpurile obligatorii.");
      return;
    }

    try {
      setIsSubmittingOrder(true);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: cartItems,
        }),
      });

      if (!response.ok) {
        throw new Error("Nu am putut trimite comanda.");
      }

      alert(`Comanda a fost trimisă cu succes. Mulțumim, ${form.nume}!`);
      clearCart();
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
    } catch {
      alert("A apărut o problemă la trimiterea comenzii. Te rugăm să încerci din nou.");
    } finally {
      setIsSubmittingOrder(false);
    }
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

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-pink-50 font-sans">
      {/* Header */}
      <header className="w-full bg-pink-200 py-8">
        <h1 className="text-5xl font-bold text-red-700 text-center">
          🌹 Butași de Trandafiri Premium 🌹
        </h1>
        <p className="text-center text-red-900 mt-2 text-lg">
          Transformă-ți grădina într-un colț de paradis! Stoc limitat!
        </p>
      </header>

      {/* Hero Section with swipe/arrow navigation */}
      <section className="relative w-full h-[480px] flex justify-center overflow-hidden">
        {heroItems[heroIdx].type === "video" ? (
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
            playsInline
            src={heroItems[heroIdx].src}
          />
        ) : (
          <img
            src={heroItems[heroIdx].src}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            alt="Hero"
          />
        )}
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex flex-col items-center justify-center px-4 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
            {heroItems[heroIdx].title}
          </h1>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white text-center">
            {heroItems[heroIdx].subtitle}
          </p>
          <button
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-6 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
          >
            Vezi produsele
          </button>
          {/* Arrow navigation */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <button
              className="bg-red-200 text-red-700 px-2 py-1 rounded-full text-xl font-bold hover:bg-red-300"
              style={{ visibility: heroIdx > 0 ? 'visible' : 'hidden' }}
              onClick={() => setHeroIdx((idx) => Math.max(0, idx - 1))}
              aria-label="Hero previous"
            >
              &#8592;
            </button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button
              className="bg-red-200 text-red-700 px-2 py-1 rounded-full text-xl font-bold hover:bg-red-300"
              style={{ visibility: heroIdx < heroItems.length - 1 ? 'visible' : 'hidden' }}
              onClick={() => setHeroIdx((idx) => Math.min(heroItems.length - 1, idx + 1))}
              aria-label="Hero next"
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>
      {/* Search */}
      
      {/* <section className="py-8 px-8">
        <input
          type="text"
          placeholder="Caută trandafir..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md mx-auto p-3 border rounded text-black"
        />
      </section> */}

      
      {/* Products */}
      <section id="products" className="pt-4 pb-16 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.length === 0 && (
            <p className="text-center text-red-900 col-span-full">
              Niciun rezultat găsit.
            </p>
          )}
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg p-6 text-center relative cursor-pointer hover:ring-2 hover:ring-red-400 transition"
              onClick={() => {
                router.push(`/product/${product.id}`);
              }}
            >
                {/* Discount badge */}
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{Math.round(
                    ((product.originalPrice - product.promoPrice) /
                      product.originalPrice) *
                      100
                  )}
                  %
                </div>

                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="mx-auto mb-4 rounded-lg h-48 object-cover"
                />
                <h3 className="text-xl font-semibold text-red-700 mb-2">
                  {product.name}
                </h3>

                <p className="text-gray-500 line-through mb-1">
                  {product.originalPrice} lei
                </p>
                <p className="text-red-900 font-bold text-2xl mb-2">
                  {product.promoPrice} lei
                </p>
                {/* Adaugă în coș button hidden, will be shown in modal */}
            </div>
          ))}
        </div>
      </section>

      {/* Product Modal */}
      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-red-600 text-xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="Închide"
            >
              ×
            </button>
            <div className="flex items-center justify-center mb-4 relative">
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-red-200 text-red-700 px-2 py-1 rounded-full text-xl font-bold hover:bg-red-300"
                style={{ visibility: modalImageIdx > 0 ? 'visible' : 'hidden' }}
                onClick={() => setModalImageIdx((idx) => Math.max(0, idx - 1))}
                aria-label="Imagine anterioară"
              >
                &#8592;
              </button>
              <img
                src={selectedProduct.images[modalImageIdx]}
                alt={selectedProduct.name + ' ' + (modalImageIdx + 1)}
                className="rounded-lg h-48 object-cover mx-8"
                style={{ minWidth: '12rem' }}
              />
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-red-200 text-red-700 px-2 py-1 rounded-full text-xl font-bold hover:bg-red-300"
                style={{ visibility: modalImageIdx < selectedProduct.images.length - 1 ? 'visible' : 'hidden' }}
                onClick={() => setModalImageIdx((idx) => Math.min(selectedProduct.images.length - 1, idx + 1))}
                aria-label="Imagine următoare"
              >
                &#8594;
              </button>
            </div>
            <h2 className="text-2xl font-bold text-red-700 mb-2 text-center">
              {selectedProduct.name}
            </h2>
            <p className="text-gray-500 line-through mb-1 text-center">
              {selectedProduct.originalPrice} lei
            </p>
            <p className="text-red-900 font-bold text-2xl mb-2 text-center">
              {selectedProduct.promoPrice} lei
            </p>
            <p className="text-sm text-gray-700 mb-4 text-center">
              {selectedProduct.description}
            </p>
            <div className="flex justify-center items-center mb-4 gap-2">
              <button
                className="bg-red-200 text-red-700 px-3 py-1 rounded text-xl font-bold hover:bg-red-300"
                onClick={() => handleQuantityChange(selectedProduct.id, quantities[selectedProduct.id] - 1)}
                aria-label="Scade cantitatea"
              >
                −
              </button>
              <span className="w-12 text-center text-lg font-semibold text-black">
                {quantities[selectedProduct.id]}
              </span>
              <button
                className="bg-red-200 text-red-700 px-3 py-1 rounded text-xl font-bold hover:bg-red-300"
                onClick={() => handleQuantityChange(selectedProduct.id, quantities[selectedProduct.id] + 1)}
                aria-label="Crește cantitatea"
              >
                +
              </button>
              <span className="text-black">buc</span>
            </div>
            <button
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              onClick={() => {
                addToCart({
                  ...selectedProduct,
                  quantity: quantities[selectedProduct.id],
                  price: selectedProduct.promoPrice,
                  image: selectedProduct.images[0],
                });
                setModalOpen(false);
              }}
            >
              Adaugă în coș
            </button>
          </div>
        </div>
      )}

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
                  <h3 className="font-semibold text-red-700">{item.name}</h3>
                  <p className="text-red-900">
                    {item.promoPrice} lei x {item.quantity}
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
        <section
          ref={checkoutRef}
          id="finalizare-comanda"
          className="py-16 px-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-red-700">
            Finalizare comandă
          </h2>
          <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            {Object.entries(form).map(([key, value]) => (
              <label key={key} className="block mb-4 text-red-700 capitalize">
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
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={handleOrder}
              disabled={isSubmittingOrder}
            >
              {isSubmittingOrder ? "Se trimite comanda..." : "Plasează comanda"}
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

// Wrap with CartProvider
export default function Home() {
  return (
    <>
      <HomeContent />
      <FloatingCartIcon />
    </>
  );
}