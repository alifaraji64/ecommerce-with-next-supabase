'use server'

import { supabase } from "@/lib/supabase"
import { ifError } from "node:assert"

export const updateProductsQty = async (id: string, quantity: string) => {
    const { data: product, error } = await supabase
        .from('products')
        .select('quantity')
        .eq('id', id)
        .single()

    if (error) {
        throw new Error(error.message)
    }
    if (product) {
        const newQuantity = product.quantity - Number(quantity)
        const { data, error } = await supabase
            .from('products')
            .update({ quantity: newQuantity })
            .eq('id', id)

        if (error) {
            throw new Error(error.message)
        }
    }
}

export const addOrder = async (products: string[], quantities: string[], total_price: string, user_id: string) => {
    console.log('added-1');
    const { error } = await supabase.from('orders').insert({
        products, quantities, total_price, user_id
    })
    if (error) {
        console.log(error);

        throw new Error(error.message)
    }
    console.log('added');

}