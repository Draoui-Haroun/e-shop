
import { getProduct } from "@/lib/api";
import CartButton from "@/app/components/CartButton";
import Image from "next/image";
import Rating from "@/app/components/Rating";

type Props = {
    params: Promise<{
        id: string;
    }>
}


export default async function ProductPage({params} : Props) {
    const {id} = await params;

    const product = await getProduct(Number(id));
    if(!product){
        return <h1>Product not Found</h1>
    }

    return(
        <>
            <div className="product-page">
                <div className="product-image">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={600}
                        height={600}
                        priority
                    />
                </div>

                <div className="product-details">
                    <h1>{product.name}</h1>

                    <h2 className="price">${product.price}</h2>

                    <p className="category">
                        <strong>Category:</strong> {product.category}
                    </p>

                    {product.brand && (
                        <p className="brand">
                            <strong>Brand:</strong> {product.brand}
                        </p>
                    )}

                    <Rating rating={product.rating} />

                    <p className={product.stock > 0 ? "in-stock" : "out-stock"}>
                        {product.stock > 0
                            ? `✔ In Stock (${product.stock} available)`
                            : "✖ Out of Stock"}
                    </p>

                    <p className="description">
                        {product.description}
                    </p>

                    <div className="product-information">
                    </div>

                    <CartButton productId={product.id} />
                </div>
                
            </div>
        </>
    )
}