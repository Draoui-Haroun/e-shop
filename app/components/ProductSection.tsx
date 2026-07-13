
import { Product } from "../types/products";
import ProductCard from "./productCard";

type Prop = {   
    title: string;
    products: Product[];
}

export default function ProductSection({title, products}: Prop) {



    return(
        <div className="product-section">
            <div className="section-header">
                <h1>{title}</h1>
            </div>
            <div className="product-row">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
    </div>
        
    )
}