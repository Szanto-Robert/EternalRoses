"use client";

export default function CheckoutSection() {
  return (
    <section
      id="checkout-section"  // 👈 THIS IS IMPORTANT
      className="py-16 px-8 bg-gray-100"
    >
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Your checkout form or summary here */}
      <p>Your cart details and checkout process go here.</p>
    </section>
  );
}
