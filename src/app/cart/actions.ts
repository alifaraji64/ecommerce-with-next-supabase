// app/actions/payid19.ts
"use server";

export async function createInvoice(price_amount: string, products: string, quantities: string, userId: string | undefined) {
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
            callback_url: `${'https://aecff38ae842.ngrok-free.app'}/api/payid19-webhook?price=${price_amount}&products=${products}&quantities=${quantities}&userId=${userId}`,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/add-order`,
        }),
    });

    if (!res.ok) {
        throw new Error(`PayID19 API error: ${res.status}`);
    }

    return res.json();
}
