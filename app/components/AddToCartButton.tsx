"use client";
import { useCart } from "../context/CartContext";

type Props = {
    productId: number;
}

export default function AddToCartButton ({productId}: Props) {

    const { cart, setCart } = useCart();

    function addToCart() {
        if (cart.includes(productId)) {
            return;
        }

        setCart([...cart, productId]);
    }

    return(
        <button className="button-add-to-cart" onClick={addToCart}>
            Add to Cart
        </button>
    );
}

