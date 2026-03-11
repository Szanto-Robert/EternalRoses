import { NextResponse } from "next/server";
import { Resend } from "resend";

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

    const resendApiKey = process.env.RESEND_API_KEY;
    const orderToEmail = process.env.ORDER_TO_EMAIL;
    const fromEmail = process.env.ORDER_FROM_EMAIL || "onboarding@resend.dev";

    if (!resendApiKey || !orderToEmail) {
      return NextResponse.json(
        { error: "Lipsesc variabilele de mediu pentru email (RESEND_API_KEY / ORDER_TO_EMAIL)." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const orderLines = items
      .map((item) => {
        const unitPrice = item.promoPrice ?? item.price ?? 0;
        const lineTotal = unitPrice * item.quantity;
        return `- ${item.name}: ${item.quantity} x ${unitPrice} lei = ${lineTotal} lei`;
      })
      .join("\n");

    const total = items.reduce((sum, item) => {
      const unitPrice = item.promoPrice ?? item.price ?? 0;
      return sum + unitPrice * item.quantity;
    }, 0);

    await resend.emails.send({
      from: fromEmail,
      to: orderToEmail,
      subject: `Comandă nouă - ${customer.nume}`,
      text: `Ai primit o comandă nouă.\n\nClient:\nNume: ${customer.nume}\nTelefon: ${customer.telefon}\nJudeț: ${customer.judet}\nLocalitate: ${customer.localitate}\nStrada: ${customer.strada}\nNumăr: ${customer.numar}\nCod poștal: ${customer.codPostal || "-"}\n\nProduse:\n${orderLines}\n\nTotal: ${total} lei`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Eroare internă la trimiterea comenzii." }, { status: 500 });
  }
}
