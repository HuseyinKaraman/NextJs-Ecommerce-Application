export const calculateAverageRating = (ratings) => {
    let totalRating = 0;

    for (const ratingObj of ratings) {
        totalRating += ratingObj.rating;
    }

    const averageRating = totalRating / ratings.length;
    return averageRating.toFixed(1);
};
