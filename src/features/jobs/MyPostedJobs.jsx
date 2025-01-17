import useAuth from "../auth/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import toast from "react-hot-toast";

const MyPostedJobs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["myPostedJobs", user?.email],
    queryFn: async () =>
      await axiosSecure
        .get(`/my-posted-jobs?email=${user?.email}`)
        .then((res) => res?.data),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id }) =>
      await axios.delete(`${import.meta.env.VITE_API_URL}/jobs/${id}`),
    onSuccess: async ({ data }) => {
      if (data?.deletedCount === 1) {
        Swal.fire({
          title: "Deleted!",
          text: "Your job has been successfully deleted.",
          icon: "success",
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["myPostedJobs"],
      });
    },
    onError: () => {
      toast.error(`Failed to delete the job. Please try again.`);
    },
  });

  const handleDeleteJob = (id) => {
    Swal.fire({
      title: "Delete Job",
      text: "Are you sure you want to delete this job? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync({ id });
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

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
