import { Link } from "react-router";

const JobCategoryCard = ({ job }) => {
  const {
    category = "Unknown",
    deadline = "N/A",
    description = "No description available.",
    jobTitle = "Untitled Job",
    maxPrice = "N/A",
    minPrice = "N/A",
    _id,
    bidCount = 0,
  } = job || {};
  return (
    <Link
      to={`/job/${_id}`}
      aria-label={`View details of ${jobTitle}`}
      className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md border hover:scale-105 transition"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Deadline: {deadline}</span>
        <span className="px-3 py-1 text-[10px] text-blue-800 uppercase bg-blue-200 rounded-full font-medium">
          {category}
        </span>
      </div>
      <div>
        <h1 className="mt-2 text-lg font-semibold">{jobTitle}</h1>
        <p className="mt-2 text-sm text-gray-600">
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </p>
        <p className="text-gray-700 font-semibold">
          Range: ${minPrice} - ${maxPrice}
        </p>
        <p className="text-gray-700 font-semibold">Total Bids: {bidCount}</p>
      </div>
    </Link>
  );
};

export default JobCategoryCard;
