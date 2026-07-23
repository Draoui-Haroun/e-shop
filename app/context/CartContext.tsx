
"use client";

import { useState, createContext, useContext, ReactNode, useEffect } from "react";

type CartItem = {
    productId: number;
    quantity: number;
}

type CartContextType = {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType | null>(null);

type Props = {
    children : ReactNode;
}

export function useCart() {
    const context = useContext(CartContext);

    if(!context){
        throw new Error("useCart must be used indide CartProvider");
    }

    return context;
}


export function CartProvider({ children }: Props) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const stringCart = localStorage.getItem("cart");

        if (stringCart) {
            setCart(JSON.parse(stringCart));
        }
        setLoaded(true);
    }, []);

    useEffect(() => {
        if(!loaded) return;

        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart, loaded]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}



