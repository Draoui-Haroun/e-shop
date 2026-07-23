
"use client"
import { useCart } from "../context/CartContext";

type Props = {
    productId : number;
}

export default function RemoveFromCartButton({productId}:Props){
    const { cart, setCart } = useCart();

    function removeFromCart() {
        const newCart = cart.filter((item) => {
            return item.productId !== productId;
        })
        setCart(newCart)
    }

    

    return(
        <button onClick={removeFromCart}>🗑 Remove</button>
    )
}