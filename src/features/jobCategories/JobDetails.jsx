import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useAuth from "../auth/useAuth";
import { FaRegUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const JobDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/jobs/${id}`)
      .then((response) => setJobDetails(response?.data))
      .catch((error) => toast.error("Failed to fetch job details!"));
  }, [id]);

  const {
    category,
    deadline,
    description,
    jobTitle,
    maxPrice,
    minPrice,
    buyer,
    _id,
  } = jobDetails || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleBidSubmission = (data) => {
    const bidDetails = {
      jobId: _id,
      price: parseFloat(data.bidPrice),
      email: data.bidderEmail,
      comment: data.bidComment,
      userProposedDeadline: data.userProposedDeadline,
      buyerEmail: buyer?.email,
      status: "Pending",
      jobTitle,
      category,
    };

    if (user?.email === buyer?.email) {
      return toast.error("You cannot bid on your own job!");
    }

    if (bidDetails.price < parseFloat(minPrice)) {
      return toast.error(
        "Your bid must be equal to or greater than the minimum price."
      );
    }

    if (new Date(bidDetails.userProposedDeadline) > new Date(deadline)) {
      return toast.error("Your proposed deadline exceeds the job's deadline!");
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}/bids`, bidDetails)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Your bid has been successfully submitted!");
          reset();
        }
      })
      .catch(() => toast.error("Failed to submit the bid!"));
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5 items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mb-10 mx-auto">
      {/* Job Details */}
      <div className="flex-1 px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px] border">
        <div className="flex items-center justify-between">
          <span className="text-sm">
            {" "}
            <span className="font-semibold">Deadline:</span> {deadline}
          </span>
          <span className="px-3 py-1 text-[10px] text-blue-800 uppercase bg-blue-200 rounded-full font-medium">
            {category}
          </span>
        </div>

        <div>
          <p className="mt-2 text-lg font-semibold">{jobTitle}</p>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
          <p className="mt-6 text-sm font-bold">Buyer Details:</p>
          <div className="flex items-center gap-5 mb-7">
            <div>
              <p className=" text-sm">
                <span className="font-semibold">Name: </span> {buyer?.name}
              </p>
              <p className=" text-sm">
                <span className="font-semibold">Email: </span> {buyer?.email}
              </p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              {buyer?.photo ? (
                <img
                  referrerPolicy="no-referrer"
                  className="rounded-full border border-black"
                  src={buyer?.photo}
                  alt="Buyer Photo"
                />
              ) : (
                <FaRegUserCircle size={40} />
              )}
            </div>
          </div>
          <p className="">
            <span className="font-semibold">Budget: </span> ${minPrice} - $
            {maxPrice}
          </p>
        </div>
      </div>

      {/* Place A Bid Form */}
      <section className="p-6 w-full bg-white rounded-md shadow-md flex-1 md:min-h-[350px] border">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Place a Bid
        </h2>

        <form onSubmit={handleSubmit(handleBidSubmission)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base">Bid Price</span>
              </label>
              <input
                {...register("bidPrice", { required: true })}
                type="number"
                placeholder="Enter your bid price"
                className="input input-bordered"
              />
              {errors.bidPrice && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base">Your Email</span>
              </label>
              <input
                {...register("bidderEmail", { required: true })}
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                value={user?.email}
                readOnly
              />
              {errors.bidderEmail && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base">Comment</span>
              </label>
              <input
                {...register("bidComment", { required: true })}
                type="text"
                placeholder="Enter your comment"
                className="input input-bordered"
              />
              {errors.bidComment && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-base">Proposed Deadline</span>
              </label>
              <input
                {...register("userProposedDeadline", { required: true })}
                type="date"
                className="input input-bordered"
              />
              {errors.userDeadline && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button type="submit" className="btn btn- bg-gray-500 text-white">
              Submit Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default JobDetails;
