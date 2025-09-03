'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { useCart } from '../context/cart-context'
import { get } from 'http'
import { CartItem, getProductById, Product } from '../lib/db'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CartList() {
    const { items } = useCart()
    const [products, setproducts] = useState<Product[]>([])
    useEffect(() => {
        const fetchProducts = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const results = await Promise.all(
                items.map((item: CartItem) => getProductById(item.productId))
            );
            //setproducts(results.filter((product): product is Product => product !== undefined));
            setproducts(results as Product[]);
        }
        fetchProducts();
    }, [items])
    if(products.length===0){
        return <div className='flex justify-center items-center h-screen'>
            <div className='animate-bounce border-2 border-blue-600 rounded-full w-40 h-40 mx-auto flex justify-center items-center'><h1>your cart is empty</h1></div>
        </div>
    }
    return (
        <>
            {items.map((item,index) => {
                const product = products.find(p => p.id === item.productId);
                return <div key={index}>
                    <Card >
                    <CardHeader>
                        <CardTitle className='text-3xl'>{product?.name}</CardTitle>
                        <CardDescription className='text-xl'>
                            {product?.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <div>
                            <p>in Stock: {product?.quantity}</p>
                        </div>
                        <img src={product?.imageUrl} alt="" />
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button variant="outline" className="w-full cursor-pointer">
                            checkout
                        </Button>
                    </CardFooter>
                </Card>
                    <hr />
                </div>
            })}
        </>

    )
}
