import { FaStar, FaPhone, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";

const GarageCard = ({
  id,
  garageName,
  rating,
  address,
  imgs,
  openTime,
  closeTime,
  tag,
  location,
  phone,
  distance,
  hasEmergency,
  description,
}) => {
  const formatDistance = (distance) =>
    typeof distance === "number" ? `${distance.toFixed(2)} km` : "N/A";

  const formatRating = (rating) =>
    typeof rating === "number" ? rating.toFixed(1) : "N/A";

  return (
    <div className="bg-white text-black border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col min-h-[260px]">
      {/* Optional image preview */}
      {imgs && imgs.length > 0 && (
        <img
          src={imgs[0]}
          alt={garageName}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
      )}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-bold truncate">{garageName || "Unnamed Garage"}</h2>
        {tag === "pro" && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full uppercase tracking-wide">
            Pro
          </span>
        )}
      </div>
      <p className="text-gray-600 flex items-center mt-1 text-sm">
        <FaMapMarkerAlt className="mr-2 text-red-500" /> {address || "Unknown address"}
      </p>
      <p className="text-gray-600 flex items-center mt-1 text-sm">
        <FaPhone className="mr-2 text-green-500" /> {phone || "No phone"}
      </p>
      <div className="flex items-center mt-1 text-sm gap-4">
        <span className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-black font-semibold">{formatRating(rating)}/5</span>
        </span>
        <span className="flex items-center">
          <FaRegClock className="mr-1 text-blue-500" />
          <span className="text-xs text-gray-700">
            {openTime && closeTime ? `${openTime} - ${closeTime}` : "No hours"}
          </span>
        </span>
        <span className="ml-auto text-xs text-gray-500">{formatDistance(distance)}</span>
      </div>
      <p className="mt-2 text-sm">
        Emergency:{" "}
        <span className={hasEmergency ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
          {hasEmergency ? "Available" : "Not Available"}
        </span>
      </p>
      <p className="text-gray-600 mt-2 text-xs">
        {(description || "No description available").slice(0, 80)}...
      </p>
      <div className="flex justify-center mt-4">
        {phone ? (
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-center font-semibold shadow"
            aria-label={`Call ${garageName || "garage"} at ${phone}`}
            style={{ wordBreak: "break-all" }}
          >
            <FaPhone className="mr-2" />
            <span>Call</span>
          </a>
        ) : (
          <button
            className="inline-block bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed text-center font-semibold"
            disabled
          >
            No Phone
          </button>
        )}
      </div>
    </div>
  );
};

export default GarageCard;