import { FaStar, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

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
    <div className="bg-white text-black border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col justify-between min-h-[320px]">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">{garageName || "Unnamed Garage"}</h2>
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
        <p className="text-gray-600 mt-1 text-sm">
          Distance: <span className="text-black font-semibold">{formatDistance(distance)}</span>
        </p>
        <div className="flex items-center mt-1 text-sm">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-black font-semibold">{formatRating(rating)}/5</span>
        </div>
        <p className="mt-2 text-sm">
          Emergency Service:{" "}
          <span className={hasEmergency ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
            {hasEmergency ? "Available" : "Not Available"}
          </span>
        </p>
        <p className="text-gray-600 mt-3 text-sm">
          {(description || "No description available").slice(0, 100)}...
        </p>
      </div>
      <div className="flex justify-center mt-5">
        {phone ? (
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition text-center font-semibold shadow"
            aria-label={`Call ${garageName || "garage"} at ${phone}`}
            style={{ wordBreak: "break-all" }}
          >
            <FaPhone className="mr-2" />
            <span className="sm:inline">Call</span>
            <span className="ml-2">{phone}</span>
          </a>
        ) : (
          <button
            className="inline-block bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed text-center font-semibold"
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