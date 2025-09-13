'use client'
import { useCart } from '@/app/context/cart-context'
import { CartItems } from '@/app/lib/types'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CartButton() {
    const { items, addItem } = useCart()
  return (
    <Link href={'/cart'} className="fixed bottom-6 right-6 cursor-pointer">
      <Button
        size="icon"
        className="relative h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
      >
        <ShoppingCart className="h-6 w-6" />

        {/* Badge */}
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {items.length}
          </span>
        )}
      </Button>
    </Link>
  )
}
