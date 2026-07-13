
import { Product } from "../types/products";
import Link from "next/link";
import Image from "next/image";
import Rating from "./Rating";

type Props = {
    product: Product;   
}

export default function ProductCard ( {product} : Props) {
    return(
        <div className="container-by-category">
        <Link href={`/products/${product.id}`}>
                <div className="container">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                    />
                    <div>
                        <h2>{product.name}</h2>
                        <h4>${product.price}</h4>
                    </div>

                    <p className="category">
                        Category: {product.category}
                    </p>

                    <p className="brand">
                        Brand: {product.brand || "Unknown"}
                    </p>

                    <Rating rating={product.rating} />

                    <p className={product.stock > 0 ? "in-stock" : "out-stock"}>
                        {product.stock > 0
                            ? `In Stock (${product.stock})`
                            : "Out of Stock"}
                    </p>
                </div>
            </Link>
        </div>
    );
}

