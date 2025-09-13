// app/actions/payid19.ts
"use server";

export async function createInvoice(price_amount: string) {
  const res = await fetch("https://payid19.com/api/v1/create_invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      public_key: process.env.PAYID19_PUBLIC_KEY,
      private_key: process.env.PAYID19_PRIVATE_KEY, // safe here
      test: 1,
      price_amount,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payid19`,
    }),
  });

  if (!res.ok) {
    throw new Error(`PayID19 API error: ${res.status}`);
  }

  return res.json();
}
