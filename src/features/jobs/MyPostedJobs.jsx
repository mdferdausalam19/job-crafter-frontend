import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../auth/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyPostedJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/my-posted-jobs?email=${user?.email}`,
        { withCredentials: true }
      )
      .then((res) => {
        setJobs(res.data);
      });
  }, [user]);
  const handleDeleteJob = (id) => {
    Swal.fire({
      title: "Delete Job",
      text: "Are you sure you want to delete this job? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/jobs/${id}`)
          .then((res) => {
            if (res.data.deletedCount === 1) {
              const remainingJobs = jobs.filter((job) => job._id !== id);
              setJobs(remainingJobs);
              Swal.fire({
                title: "Deleted!",
                text: "Your job has been successfully deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };
  return (
    <div className="mb-10">
      <div className="text-center mt-5 mb-5 space-y-4">
        <h1 className="text-2xl font-bold">My Posted Jobs</h1>
        <p className="text-gray-600">
          Manage all the jobs you have posted. Update or delete jobs easily.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Deadline</th>
              <th>Price Range</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job._id}>
                <th>{index + 1}</th>
                <td>{job?.jobTitle}</td>
                <td>{job?.deadline}</td>
                <td>
                  ${job?.minPrice} - ${job?.maxPrice}
                </td>
                <td
                  className={`${
                    job?.category === "Web Development" && "text-blue-500"
                  } ${
                    job?.category === "Graphic Design" && "text-emerald-500"
                  } ${
                    job?.category === "Digital Marketing" && "text-pink-500"
                  }`}
                >
                  {job?.category}
                </td>
                <td className="space-y-2">
                  <Link
                    to={`/update-job/${job._id}`}
                    className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => {
                      handleDeleteJob(job._id);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPostedJobs;
