
const BASE_URL = "https://dummyjson.com/products";

type ApiProduct = {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    category: string;
    description: string;
    rating: number;
    stock: number;
    brand?: string;
};

export async function getProducts() {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data.products.map((product:ApiProduct) => ({
        id: product.id,
        name: product.title,
        image: product.thumbnail,
        price: product.price,
        category: product.category,
        description: product.description,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand,
    }))
}

export async function getProduct(id:number) {

    const responce = await fetch(`${BASE_URL}/${id}`);

    if (!responce.ok) {
        throw new Error("Failed to fetch product");
    }
    
    const product = await responce.json();

    return {
        id: product.id,
        name: product.title,
        image: product.thumbnail,
        price: product.price,
        category: product.category,
        description: product.description,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand,
    }
}