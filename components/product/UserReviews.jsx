"use client";
import Stars from "./Stars";
import RatingDistribution from "./RatingDistribution";

const UserReviews = ({ reviews }) => {


    return (
        <>
            {reviews.length > 0 ? (
                <>
                    <RatingDistribution reviews={reviews} />

                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col p-2 gap-2 md:w-[800px] bg-gray-100 rounded-md"
                        >
                            <p className="text-xl font-semibold">{review?.postedBy?.name}</p>
                            <Stars rating={review?.rating} />
                            {review?.comment && <p>{review?.comment}</p>}
                            <p className="ml-auto">{review.createdAt.substring(0, 10)}</p>
                        </div>
                    ))}
                </>
            ) : (
                <p>No reviews yet.</p>
            )}
        </>
    );
};

export default UserReviews;
