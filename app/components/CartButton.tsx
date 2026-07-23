"use client";
import { useCart } from "../context/CartContext";

type Props = {
    productId: number;
}

export default function CartButton ({productId}: Props) {

    const { cart, setCart } = useCart();
    const cartItem = cart.find( item => item.productId === productId);
    const isInCart = !!cartItem;

    function addToCart() {

        if (cartItem) {
            const newCart = cart.map((item) => {
            if (item.productId === productId) {
                return { ...item, quantity: item.quantity + 1}
            }
            
            return item
        });
        setCart(newCart)
        }else{
            setCart([...cart, {productId, quantity: 1}]);
        }
    }

    function increaseQuantity(){
        const newCart = cart.map((item) => {
            if (item.productId === productId) {
                return { ...item, quantity: item.quantity + 1}
            }
            return item
        });
        setCart(newCart)
    }

    function decreaseQuantity() {

    if (cartItem && cartItem.quantity > 1) {
        const newCart = cart.map((item) => {
            if (item.productId === productId) {
                return { ...item, quantity: item.quantity - 1}
            }
            return item
        });
        setCart(newCart)
        
    } else {
        const newCart = cart.filter((item) => {
            return cartItem?.productId !== item.productId
        })
        setCart(newCart)
    }

}

    return(
        isInCart ? (
            <div className="quantity-controls">
                <button onClick={decreaseQuantity} >-</button>
                <span>{cartItem.quantity}</span>
                <button onClick={increaseQuantity} >+</button>
            </div>
        ):(
            <button
            className="button-add-to-cart"
            onClick={addToCart}
            >
                Add to cart
            </button>
        )
    );
}

