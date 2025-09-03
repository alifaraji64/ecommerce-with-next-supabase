"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "../lib/db";

type CartContextType = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (item: CartItem) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (item: CartItem) => setItems([item, ...items]);
    const removeItem = (item: CartItem) => setItems((currentItems) => currentItems.filter(i => i.productId !== item.productId));

    return (
        <CartContext.Provider value={{ items, addItem, removeItem }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
