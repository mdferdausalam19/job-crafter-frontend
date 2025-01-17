import axios from "axios";
import { useState } from "react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import JobCategoryCard from "../jobCategories/JobCategoryCard";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const AllJobs = () => {
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");

  const { data: count = 0 } = useQuery({
    queryKey: ["jobsCount", currentPage, itemsPerPage, filter, searchText],
    queryFn: async () =>
      await axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }/jobs-count?filter=${filter}&search=${searchText}`
        )
        .then((res) => res?.data?.count),
  });

  const { data: jobs = [] } = useQuery({
    queryKey: ["allJobs", currentPage, filter, itemsPerPage, searchText, sort],
    queryFn: async () =>
      await axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }/all-jobs?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${searchText}`
        )
        .then((res) => {
          setLoading(false);
          return res?.data;
        })
        .catch(() =>
          toast.error("Failed to fetch jobs. Please try again later.")
        ),
  });

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(e.target?.search?.value);
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="flex flex-col justify-between mt-10 mb-10">
      <div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div>
            <select
              className="select select-bordered w-full max-w-xs"
              name="category"
              id="category"
              onChange={(e) => {
                setFilter(e.target?.value);
                setCurrentPage(0);
              }}
              value={filter}
            >
              <option value="">Filter By Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>

          <form onSubmit={handleSearch}>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                name="search"
                className="grow"
                placeholder="Enter Job Title"
                onChange={(e) => setSearchText(e.target?.value)}
                value={searchText}
              />
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </label>
          </form>
          <div>
            <select
              name="sort"
              id="sort"
              className="select select-bordered w-full max-w-xs"
              value={sort}
              onChange={(e) => {
                setSort(e.target?.value);
                setCurrentPage(0);
              }}
            >
              <option value="">Sort By Deadline</option>
              <option value="asc">Ascending Order</option>
              <option value="dsc">Descending Order</option>
            </select>
          </div>
          <button
            onClick={() => {
              setFilter("");
              setSearchText("");
              setSort("");
              setCurrentPage(0);
            }}
            className="btn"
          >
            Reset
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobs.map((job) => (
            <JobCategoryCard key={job._id} job={job}></JobCategoryCard>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          disabled={currentPage <= 0}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white`}
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>

        {pages.map((pageNum) => (
          <button
            onClick={() => setCurrentPage(pageNum)}
            key={pageNum}
            className={` ${
              currentPage === pageNum && "bg-blue-500 text-white"
            } hidden px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {pageNum + 1}
          </button>
        ))}

        <button
          disabled={currentPage === numberOfPages - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white`}
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AllJobs;
