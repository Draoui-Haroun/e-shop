
import {Dispatch, SetStateAction} from "react"

type Prop = {
    sortBy: string;
    setSortBy: Dispatch<SetStateAction<string>>
}

export default function SortSelect({sortBy, setSortBy}: Prop) {
    return(
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
    );
}