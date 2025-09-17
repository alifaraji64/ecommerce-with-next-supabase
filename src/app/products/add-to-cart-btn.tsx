'use client'
import React from 'react'
import {Product} from '../../lib/types'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useCart } from '../context/cart-context'
export default function AddToCartButn({product}:{product:Product}) {
    const { addItem } = useCart()
    return (
        <Button className="w-full" onClick={() => {
            if (product.quantity === 0) {
                toast.error("This product is out of stock")
                return;
            }
            addItem({ productId: product.id, quantity: 1 })
            toast("item has been added to the cart", {
                action: {
                    label: "dismiss",
                    onClick: () => console.log("Undo"),
                },
            })

        }}>
            add to your cart - ${product.price}
        </Button>
    )
}
