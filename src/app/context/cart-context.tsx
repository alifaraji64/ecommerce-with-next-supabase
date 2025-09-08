"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartItem, Product } from "../lib/types";
import { getProductById } from "../lib/db";

type CartContextType = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (item: CartItem) => void;
    totalPrice: number;
    calcTotalPrice: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    
    const [items, setItems] = useState<CartItem[]>([]);

    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        calcTotalPrice();
    }, [items]);

    const removeItem = (item: CartItem) => setItems((currentItems) => currentItems.filter(i => i.productId !== item.productId));

    const addItem = (item: CartItem) => {
        setItems((currentItems) => {
            const filteredItems = currentItems.filter(i => i.productId !== item.productId);
            return [item, ...filteredItems];
        });
    }

    const calcTotalPrice = async () => {
        const products = await Promise.all(
            items.map((item) => getProductById(item.productId))
        );
        const total = products.reduce((sum, product, i) => {
            return sum + product!.price * items[i].quantity;
        }, 0);
        setTotalPrice(total);
    };

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, totalPrice, calcTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
