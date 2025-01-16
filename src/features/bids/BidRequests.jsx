import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../auth/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const BidRequests = () => {
  const { user } = useAuth();
  // const [bids, setBids] = useState([]);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: bids = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["bidRequests", user?.email],
    queryFn: () =>
      axiosSecure
        .get(`/bid-requests?email=${user?.email}`)
        .then((res) => res?.data),
  });

  // useEffect(() => {
  //   axiosSecure
  //     .get(`/bid-requests?email=${user?.email}`)
  //     .then((res) => setBids(res?.data));
  // }, [user, axiosSecure]);

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, currentStatus }) =>
      await axios.patch(`${import.meta.env.VITE_API_URL}/bid-status/${id}`, {
        status: currentStatus,
      }),
    onSuccess: ({ data }) => {
      if (data?.modifiedCount > 0) {
        toast.success("Status updated successfully!");
      }
      // refetch();
      queryClient.invalidateQueries({ queryKey: ["bidRequests"] });
    },
    onError: (err) => {
      toast.error(`Failed to update the bid request. Please try again.`);
    },
  });

  const handleStatus = async (id, previousStatus, currentStatus) => {
    if (previousStatus === currentStatus) {
      toast.error("This action is not permitted as the status is already set.");
      return;
    }
    // axios
    //   .patch(`${import.meta.env.VITE_API_URL}/bid-status/${id}`, {
    //     status: currentStatus,
    //   })
    //   .then((res) => {
    //     if (res?.data?.modifiedCount > 0) {
    //       toast.success("Status updated successfully!");
    //       setBids(
    //         bids.map((bid) =>
    //           bid._id === id ? { ...bid, status: currentStatus } : bid
    //         )
    //       );
    //     }
    //   })
    //   .catch(() =>
    //     toast.error("Failed to update the bid request. Please try again.")
    //   );
    await mutateAsync({ id, currentStatus });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="mb-10">
      <div className="text-center mt-5 mb-5 space-y-4">
        <h1 className="text-2xl font-bold">Bid Requests</h1>
        <p className="text-gray-600">
          View and manage all bid requests for the jobs you’ve posted. Accept or
          reject bids as necessary.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Email</th>
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
                <td>{bid?.email}</td>
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
                    className={`py-1 ${
                      bid?.status === "Pending" && "text-yellow-500"
                    } ${bid?.status === "In Progress" && "text-blue-500"} ${
                      bid?.status === "Complete" && "text-green-500"
                    } ${bid?.status === "Rejected" && "text-red-500"}`}
                  >
                    {bid?.status}
                  </p>
                </td>
                <td className="space-y-2 space-x-2">
                  <button
                    onClick={() =>
                      handleStatus(bid?._id, bid?.status, "In Progress")
                    }
                    disabled={bid?.status === "Complete"}
                    className="bg-green-500 text-white px-2 py-1 rounded disabled:cursor-not-allowed"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleStatus(bid?._id, bid?.status, "Rejected")
                    }
                    disabled={bid?.status === "Complete"}
                    className="bg-red-500 text-white px-2 py-1 rounded disabled:cursor-not-allowed"
                  >
                    Reject
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

export default BidRequests;
