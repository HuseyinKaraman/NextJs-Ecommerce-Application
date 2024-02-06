"use client";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Stars = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i}  className="!text-red-600"/>);
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars.push(<FaStarHalfAlt key={i} className="!text-red-600"/>);
        } else {
            stars.push(<FaRegStar key={i} className="!text-secondray !align-middle" />);
        }
    }

    return <div className="flex items-center">{stars}</div>;
};

export default Stars;
