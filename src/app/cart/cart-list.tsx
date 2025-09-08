'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { useCart } from '../context/cart-context'
import { get } from 'http'
import { CartItem, Product } from '../lib/types'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Loading from './loading'
import { getProductById } from '../lib/db'

export default function CartList() {
    const { items, removeItem,totalPrice } = useCart()
    const [products, setproducts] = useState<Product[]>([])
    useEffect(() => {
        const fetchProducts = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const results = await Promise.all(
                items.map((item: CartItem) => getProductById(item.productId))
            );
            setproducts(results as Product[]);
        }

        fetchProducts();
        
    }, [items])
    if (products.length === 0) {
        return <Loading></Loading>;
    }
    return (
        <>
            <h3 className='m-8 text-xl font-bold'>Total Price: ${totalPrice}</h3>
            {items.map((item, index) => {
                const product = products.find(p => p.id === item.productId);
                return <div key={index}>
                    <Card className='m-8'>
                        <CardHeader className='flex items-center gap-4 justify-evenly'>
                            <div>
                                <CardTitle className='text-3xl'>{product?.name}</CardTitle>
                                <CardDescription className='text-xl'>
                                    {product?.description}
                                </CardDescription>
                            </div>

                            <img className='max-w-40' src={product?.images[0]} alt="" />
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center p-6">
                            <div>
                                <p>Quantity: {items.find(item => item.productId == product?.id)?.quantity}</p>
                            </div>

                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button variant="outline" className="w-full cursor-pointer">
                                checkout
                            </Button>
                            <Button onClick={() => { removeItem(item) }} variant="destructive" className="w-full cursor-pointer">
                                Remove from cart
                            </Button>
                        </CardFooter>
                    </Card>
                    <hr />
                </div>
            })}
        </>

    )
}
