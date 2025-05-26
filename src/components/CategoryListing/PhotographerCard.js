import Link from "next/link";
import { FaStar, FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

export default function PhotographerCard({ photographer }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      {/* Profile Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={photographer.profilePic}
          alt={photographer.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold">{photographer.name}</h3>

        <div className="flex items-center mt-2 text-gray-600">
          <FaMapMarkerAlt className="mr-1" />
          <span>{photographer.location}</span>
        </div>

        <div className="flex items-center mt-2">
          <FaRupeeSign className="text-gray-600" />
          <span className="font-medium">
            Starting from {photographer.price}
          </span>
        </div>

        <div className="flex items-center mt-2">
          <FaStar className="text-yellow-400 mr-1" />
          <span>{photographer.rating.toFixed(1)}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {photographer.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/photographers/${photographer.id}`}
          className="block mt-4 w-full py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
