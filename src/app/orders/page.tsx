export const revalidate = 0; // disables ISR, always fetch fresh data

import React from 'react'
import { supabase } from '../../lib/supabase'
import { currentUser } from '@clerk/nextjs/server'
import { getProductById } from '@/lib/db';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { format } from "date-fns";

export default async function Orders() {
    const user = await currentUser()
    if (!user) return;
    const { data, error } = await supabase.from('orders').select('*').eq('user_id', user.id)
    if (error) {
        console.log(error);

    }
    const results = await Promise.all(
        (data ?? []).map(async (order) => {
            return Promise.all(
                order.products.map(async (productId: string, index: number) => {
                    const product = await getProductById(Number(productId));

                    return {
                        name: product?.name,
                        quantity: order.quantities[index],
                        created_at: format(product?.created_at!, "PPP p"),
                        total_price: order.total_price
                    };
                })
            );
        })
    );
    if(!results.length){
        return <h1 className='text-xl p-2'>No order have been placed yet</h1>
    }
    return (
        <div className='p-4'>
            <h1>Orders</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {results.map((order, index) => (
                    <Card key={index}>
                        <CardContent>
                            <h2 className='text-center text-gray-500'>{order[0].created_at}</h2>
                            <div>
                                {order.map((item, index) => (
                                    <div key={index}>
                                        <h1>{item.name}{'   '} <span className='text-red-400'>{item.quantity}</span></h1>
                                    </div>
                                ))}

                            </div>
                            <h2 className='text-gray-400 mx-auto text-center mt-4'>total price: ${order[0].total_price}</h2>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
