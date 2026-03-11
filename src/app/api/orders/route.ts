import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  promoPrice?: number;
  price?: number;
};

type Customer = {
  nume: string;
  telefon: string;
  judet: string;
  localitate: string;
  strada: string;
  numar: string;
  codPostal?: string;
};

type OrderPayload = {
  customer: Customer;
  items: OrderItem[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderPayload;
    const { customer, items } = body;

    if (!customer || !items || items.length === 0) {
      return NextResponse.json({ error: "Date comandă invalide." }, { status: 400 });
    }

    const requiredFields: Array<keyof Customer> = [
      "nume",
      "telefon",
      "judet",
      "localitate",
      "strada",
      "numar",
    ];

    const hasMissingRequired = requiredFields.some((field) => !customer[field]);
    if (hasMissingRequired) {
      return NextResponse.json({ error: "Lipsesc câmpuri obligatorii." }, { status: 400 });
    }

    const total = items.reduce((sum, item) => {
      const unitPrice = item.promoPrice ?? item.price ?? 0;
      return sum + unitPrice * item.quantity;
    }, 0);

    const orderRef = `ER-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const collectionName = process.env.FIREBASE_ORDERS_COLLECTION || "orders";

    console.info(
      "ORDER_BACKUP",
      JSON.stringify({
        orderRef,
        createdAt: new Date().toISOString(),
        customer,
        items,
        total,
      })
    );

    await adminDb.collection(collectionName).doc(orderRef).set({
      orderRef,
      createdAt: new Date().toISOString(),
      customer,
      items,
      total,
      status: "new",
    });

    return NextResponse.json({ ok: true, orderRef });
  } catch (error) {
    console.error("Orders API error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Eroare internă la salvarea comenzii.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
