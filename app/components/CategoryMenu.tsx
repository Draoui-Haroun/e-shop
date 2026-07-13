
import { Dispatch, SetStateAction } from "react"

type Prop = {
    categories: string[];
    setSelectedCategory: Dispatch<SetStateAction<string>>;
    selectedCategory: string;
}

export default function CategoryMenu({categories, selectedCategory, setSelectedCategory}: Prop) {

    return(
        <div className="menu">
            {categories.map((category) => (
                <button 
                key={category}
                onClick={() => setSelectedCategory(category)} 
                className={category === selectedCategory ? "active" : ""}
                >
                {category}
                </button>
            ))}
        </div>
    )
    
}