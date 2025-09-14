'use client'
import React, { useEffect } from 'react'
import { useCart } from '../context/cart-context'

export default function ClearCartItems() {
    const {setItems,items}=useCart()
    useEffect(() => {
      setItems([])
      console.log(items);
      
    }, [])
    
  return (
    null
  )
}
