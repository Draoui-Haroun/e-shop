"use client"
import { useCart } from "../context/CartContext"
import Link from "next/link";

export default function Header() {

  const { cart } = useCart();

    return (
        <div className="header">
        <h1>E-Shop</h1>
        <Link href="/cart">
          <div className="shopping-cart">
            🛒
            <span className="cart-count">{cart.length}</span>
          </div>
        </Link>
      </div>
    )
}