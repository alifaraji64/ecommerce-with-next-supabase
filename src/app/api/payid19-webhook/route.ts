import { addOrder, updateProductsQty } from "@/app/add-order/actions";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


// PayID19 will POST here
export async function POST(req: Request) {
    const body = await req.json();
    console.log("✅ Webhook received:", body);
    const { searchParams } = new URL(req.url);
    const price = searchParams.get("price");
    const products = searchParams.get("products")?.split("-");
    const quantities = searchParams.get("quantities")?.split("-");
    const userId = searchParams.get('userId');
    if (!price || !products || !quantities || !userId) {
        console.log(price,products,quantities,userId);
        
        throw new Error('credential missing in webhook')
      }
    try {
        await Promise.all(
          products!.map((p, i) => updateProductsQty(p, quantities[i]))
        );
        await addOrder(products, quantities, price, userId);
      } catch (error) {
        console.error("Order error:", error);
      }
    // Respond 200 OK so Payid19 doesn’t retry
    return NextResponse.json({ received: true }, { status: 200 });
}