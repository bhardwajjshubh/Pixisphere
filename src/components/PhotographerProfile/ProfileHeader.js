import { FaStar, FaMapMarkerAlt, FaRupeeSign, FaCamera } from "react-icons/fa";

export default function ProfileHeader({ photographer, openInquiryModal }) {
  if (!photographer) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-48 h-48 bg-gray-200 rounded-lg flex-shrink-0">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400">Profile Image</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">{photographer.name}</h1>
              <div className="flex items-center mt-2 md:mt-0">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">
                  {photographer.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2" />
              <span>{photographer.location}</span>
            </div>

            <div className="flex items-center font-medium mb-4">
              <FaRupeeSign className="mr-1 text-gray-600" />
              <span>Starting from {photographer.price}</span>
            </div>

            <p className="text-gray-700 mb-4">{photographer.bio}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Specializations:</h3>
              <div className="flex flex-wrap gap-2">
                {photographer.styles.map((style) => (
                  <span
                    key={style}
                    className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                  >
                    <FaCamera className="mr-1" />
                    {style}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {photographer.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <button
            onClick={openInquiryModal}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}
