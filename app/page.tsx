"use client"
import { Product } from "./types/products";
import { useEffect, useState } from "react";
import CategoryMenu from "./components/CategoryMenu";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";
import ProductSection from "./components/ProductSection";
import { getProducts } from "@/lib/api";

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState<Product[]>([]);
  const categories = ["All", ...new Set(products.map((product) => product.category)),];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            setError("Failed to load products.");
        } finally {
            setLoading(false);
        }
    }

    fetchProducts();
}, []);

  const filteredProducts =
    selectedCategory === "All"
      ?products.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase())
      })
      :products.filter((product) => {
        return product.category === selectedCategory && product.name.toLowerCase().includes(searchTerm.toLowerCase()) ;
      });

  const sortedProducts = [...filteredProducts];
  if (sortBy === 'price-low'){
    sortedProducts.sort((a, b) => {
      return a.price - b.price;
    });
  }else if (sortBy === 'price-high'){
    sortedProducts.sort((a, b) => {
      return b.price - a.price;
    });
  }else if (sortBy === 'name-asc'){
    sortedProducts.sort((a, b) =>{
      return a.name.localeCompare(b.name)
    })
  }else if (sortBy === 'name-desc'){
    sortedProducts.sort((a, b) =>{
      return b.name.localeCompare(a.name)
    })
  }

  if(loading){
    return (
      <div className="skeleton-grid">
        {Array.from({length: 8}).map((_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton-image">
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-price"></div>
                <div className="skeleton-category"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error){
    return(
      <div className="error-page">
        <h1>⚠️</h1>
        <h2>{error}</h2>
        <p>Please check your internet connection.</p>
      </div>
    )
  }
     

return (
  <div className="body">
  <section className="toolbar">
    <div className="search-sort">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <SortSelect
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>

    <CategoryMenu
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  </section>

  <div className="sections">
    <ProductSection 
      title={selectedCategory === "All" ? "All Products" : selectedCategory}
      products={sortedProducts} 
      />
  </div>

</div>
  );
}
