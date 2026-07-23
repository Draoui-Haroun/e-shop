
"use client"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type Props = {
    rating: number;
}

export default function Rating({rating}:Props) {

    const roundedRating = Math.round(rating * 2) / 2;
    return(
        <div className="rating">
            {[1,2,3,4,5].map((star) => {
                if(roundedRating >= star){
                    return <FaStar key={star} className="star filled" />;
                }
                if ( roundedRating >= star - 0.5) {
                    return <FaStarHalfAlt key={star} className="star filled" />;
                }

                return <FaRegStar key={star} className="satr" />;
            })}

            <span className="rating-value">
                {roundedRating.toFixed(1)}
            </span>
        </div>
    )
}
