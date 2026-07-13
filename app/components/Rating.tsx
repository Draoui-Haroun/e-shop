import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type Props = {
    rating: number;
}

export default function Rating({rating}:Props) {
    return(
        <div className="rating">
            {[1,2,3,4,5].map((star) => {
                if(rating>=star){
                    return <FaStar key={star} className="star filled" />;
                }
                if ( rating >= star - 0.5) {
                    return <FaStarHalfAlt key={star} className="star filled" />;
                }

                return <FaRegStar key={star} className="satr" />;
            })}

            <span className="rating-value">
                {rating.toFixed(1)}
            </span>
        </div>
    )
}
