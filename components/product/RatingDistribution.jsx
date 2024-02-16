"use client";
import Stars from "./Stars";
import { calculateAverageRating } from "@/utils/helpers";

const RatingDistribution = ({ reviews }) => {
    const averageRating = reviews.length > 0 ? calculateAverageRating(reviews) : 0;
    // calculate rating distribution and total number of ratings
    let totalReviews = 0;
    const ratingDistribution = reviews.reduce(
        (acc, review) => {
            acc[review.rating]++;
            totalReviews++;
            return acc;
        },
        {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
        }
    );

    const calculatePercentage = (count) => {
        let percentage = ((count / totalReviews) * 100).toFixed(2);
        percentage = parseFloat(percentage) === parseInt(percentage) ? parseInt(percentage) : percentage;
        return percentage;
    };

    return (
        <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-2">
                <p className="text-6xl font-semibold">{averageRating}</p>
                <Stars rating={averageRating} />
                <p>Product Rating</p>
            </div>
            <div className="col-span-3 md:col-span-2">
                {[5, 4, 3, 2, 1].map((star) => (
                    <div className="flex gap-5 justify-evenly items-center" key={star}>
                        <div className="w-[200px] md:w-[300px] h-[12px] bg-gray-300">
                            <div
                                className="w-full h-full bg-gray-400"
                                style={{ width: `${calculatePercentage(ratingDistribution[star])}%` }}
                            ></div>
                        </div>

                        <div className="flex gap-2 items-center w-[180px]">
                            <Stars key={star} rating={star} />
                            <p className="text-lg">{calculatePercentage(ratingDistribution[star])} %</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingDistribution;
