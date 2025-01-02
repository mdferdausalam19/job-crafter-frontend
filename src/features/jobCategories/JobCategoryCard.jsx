import { Link } from "react-router";

const JobCategoryCard = () => {
  return (
    <Link>
      <div className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md border hover:scale-105 transition">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Courses and MOOCs</span>
          <span className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full font-semibold dark:bg-blue-300 dark:text-blue-900">
            psychology
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-lg font-semibold">
            Course 5: Health and Behavior
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
          </p>
        </div>

        <div>
          <div className="mt-2">
            <p className="text-gray-700 font-semibold">Range: $100 - $150</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCategoryCard;
