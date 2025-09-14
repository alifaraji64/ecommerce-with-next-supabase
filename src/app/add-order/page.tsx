import React from 'react'
import ClearCartItems from './clear-cart-items';
import { addOrder, updateProductsQty } from './actions';
import { toast } from 'sonner';
import { currentUser } from '@clerk/nextjs/server';

export default async function AddOrder({ searchParams }: { searchParams: Record<string, string | undefined> }) {
    const products = searchParams.products?.split('-');
    const quantities = searchParams.quantities?.split('-');
    const total_price = searchParams.price;
    const user = await currentUser()
    if (!total_price || !products || !quantities|| !user) {
        console.log('loggihn');

        return;
    }
    try {
        await Promise.all(products.map(async (p, i) => await updateProductsQty(p, quantities[i])))
        await addOrder(products, quantities, total_price,user.id)
    } catch (error) {
        console.log(error);
        
    }
    return (
        <>
            <ClearCartItems></ClearCartItems>
        </>
    )
}
