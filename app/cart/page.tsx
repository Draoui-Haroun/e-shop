"use client";
import { FiShoppingCart } from "react-icons/fi";
import { getProducts } from "@/lib/api";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import RemoveFromCartButton from "../components/RemoveFromCartButton";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../types/products";

export default function CartPage() {

    const {cart} = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    

    useEffect(() => {
        async function fetchProducts() {
            const data = await getProducts();
            setProducts(data);
        }
        fetchProducts()
    }, [])
    
    
    const cartProducts = products.filter((product) => {
            return cart.some((item) => item.productId === product.id);
        });

    const total = cartProducts.reduce((total, value) => {
        const cartItem = cart.find((item) => {
            return item.productId === value.id;
        })
        return total + value.price * (cartItem?.quantity ?? 0);
    }, 0)

    if(cartProducts.length === 0){
        return (
            <div className="empty-cart">
                <FiShoppingCart className="empty-cart-icon"/>
                <h1>Your Cart is Empty</h1>
                <p>Looks like you haven't added any products yet.</p>

                <Link href="/">
                    <button>Continue Shopping</button>
                </Link>
            </div>
        )
    }


    return(
        <div className="cart-page">
            <h1>Your choices</h1>
            
            <div className="container-cart-page">
                {cartProducts.map((cartProduct) =>{
                    const cartItem = cart.find((item) => {
                        return item.productId === cartProduct.id;
                    })
                    return(
                    <div className="cart-item" key={cartProduct.id}>
                        <Link href={`/products/${cartProduct.id}`} className="cart-link">
                            <Image
                                src={cartProduct.image}
                                alt={cartProduct.name}
                                width={400}
                                height={400}
                            />

                            <div className="product-info">
                                <h2>{cartProduct.name}</h2>
                                <p>Category: {cartProduct.category}</p>
                                <p>Quantity: {cartItem?.quantity}</p>
                                <h3 className="price">${cartProduct.price}</h3>
                            </div>

                            
                        </Link>

                        <RemoveFromCartButton productId={cartProduct.id} />
                    </div>

                    )
                })}
            </div>

            <h1>Total Price</h1>
            <div className="total-price">
                {cartProducts.map((cartProduct) =>{
                    const cartItem = cart.find((item) => {
                        return item.productId === cartProduct.id;
                    })
                    return(
                        <h4 key={cartProduct.id}>{cartProduct.name}: ${(cartProduct.price * (cartItem?.quantity ?? 0)).toFixed(2)}</h4>
                    )   
                })}
                <h2>Total: ${total.toFixed(2)}</h2>
            </div>
        </div>
    );
}