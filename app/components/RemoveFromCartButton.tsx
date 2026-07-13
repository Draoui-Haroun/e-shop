
import { useCart } from "../context/CartContext";

type Props = {
    productId: number;
}

export default function RemoveFromCartButton({productId}:Props) {

    const { cart, setCart } = useCart();    

    return(
        <button onClick={() => {
            const newCart = cart.filter((id) => id !== productId);
            setCart(newCart);
        }}>
            Remove From the Cart
        </button>
    )
}