import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Reviews({ reviews = [] }) {
  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }

    return <div className="flex">{stars}</div>;
  };

  if (reviews.length === 0) {
    return (
      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
          No reviews yet
        </div>
      </div>
    );
  }

  // Calculate average rating
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <div className="flex items-center">
          <span className="font-semibold mr-2">{averageRating.toFixed(1)}</span>
          {renderStars(averageRating)}
          <span className="ml-2 text-gray-500">({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{review.name}</h3>
                <div className="text-sm text-gray-500">
                  {formatDate(review.date)}
                </div>
              </div>
              {renderStars(review.rating)}
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
