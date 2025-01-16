import axios from "axios";
import useAuth from "../auth/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const MyBids = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bids = [], isLoading } = useQuery({
    queryKey: ["myBids", user?.email],
    queryFn: async () =>
      await axiosSecure
        .get(`/my-bids?email=${user?.email}`)
        .then((res) => res?.data),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, status }) =>
      await axios.patch(`${import.meta.env.VITE_API_URL}/bid-status/${id}`, {
        status,
      }),
    onSuccess: ({ data }) => {
      if (data?.modifiedCount > 0) {
        toast.success(
          "Congratulations! You’ve successfully marked the task as complete."
        );
      }
      queryClient.invalidateQueries({ queryKey: ["myBids"] });
    },
    onError: () => {
      toast.error("Unable to update the bid status. Please try again.");
    },
  });

  const handleStatus = async (id, status) => {
    await mutateAsync({ id, status });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="mb-10">
      <div className="text-center mt-5 mb-5 space-y-4">
        <h1 className="text-2xl font-bold">My Bids</h1>
        <p className="text-gray-600">
          Track and manage all the jobs you’ve bid on, and mark tasks as
          complete when finished.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Deadline</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bids?.map((bid, index) => (
              <tr key={bid._id}>
                <th>{index + 1}</th>
                <td>{bid?.jobTitle}</td>
                <td>{bid?.userProposedDeadline}</td>
                <td>${bid?.price}</td>
                <td
                  className={`${
                    bid?.category === "Web Development" && "text-blue-500"
                  } ${
                    bid?.category === "Graphic Design" && "text-emerald-500"
                  } ${
                    bid?.category === "Digital Marketing" && "text-pink-500"
                  }`}
                >
                  {bid?.category}
                </td>
                <td>
                  <p
                    className={`py-1 rounded-full ${
                      bid?.status === "Pending" && "text-yellow-500"
                    } ${bid?.status === "In Progress" && "text-blue-500"} ${
                      bid?.status === "Complete" && "text-green-500"
                    } ${bid?.status === "Rejected" && "text-red-500"}`}
                  >
                    {bid?.status}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => handleStatus(bid?._id, "Complete")}
                    disabled={bid?.status !== "In Progress"}
                    className="bg-blue-500 text-white px-2 py-1 rounded disabled:cursor-not-allowed"
                  >
                    Complete
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

export default MyBids;
