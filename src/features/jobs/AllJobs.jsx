import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import JobCategoryCard from "../jobCategories/JobCategoryCard";
import toast from "react-hot-toast";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/all-jobs?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${searchText}`
        );
        setJobs(response?.data);
      } catch (err) {
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, [currentPage, filter, itemsPerPage, searchText, sort]);

  useEffect(() => {
    const getJobsCount = async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/jobs-count?filter=${filter}&search=${searchText}`
      );
      setCount(response?.data?.count);
    };
    getJobsCount();
  }, [currentPage, itemsPerPage, filter, searchText]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(e.target?.search?.value);
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (error) {
    return toast.error(error);
  }

  const pages = [...Array(numberOfPages).keys()];
  return (
    <div className="container mx-auto flex flex-col justify-between mt-10 mb-10">
      <div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
          <div>
            <select
              name="category"
              id="category"
              className="border p-4 rounded-lg"
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
            <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                name="search"
                placeholder="Enter Job Title"
                aria-label="Enter Job Title"
                onChange={(e) => setSearchText(e.target?.value)}
                value={searchText}
              />

              <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              name="sort"
              id="sort"
              className="border p-4 rounded-md"
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
