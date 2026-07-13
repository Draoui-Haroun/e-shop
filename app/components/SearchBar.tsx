
import { Dispatch, SetStateAction } from "react"

type Prop = {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>
}

export default function SearchBar({searchTerm, setSearchTerm}: Prop) {
    return(
        <input 
            type="text"
            placeholder="Search for products..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    )
}