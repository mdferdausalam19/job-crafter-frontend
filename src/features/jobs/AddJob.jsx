import { useForm } from "react-hook-form";
import useAuth from "../auth/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

const AddJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutateAsync } = useMutation({
    mutationFn: async ({ jobInfo }) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/jobs`, jobInfo),
    onSuccess: ({ data }) => {
      if (data?.insertedId) {
        toast.success("Job posted successfully!");
        reset();
        navigate("/my-posted-jobs");
      }
    },
    onError: () => {
      toast.error("Unable to post the job. Please try again.");
    },
  });
  const handleAddJob = async (data) => {
    const jobInfo = {
      jobTitle: data.jobTitle,
      deadline: data.deadline,
      category: data.category,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      description: data.description,
      buyer: {
        name: user?.displayName,
        photo: user?.photoURL,
        email: user?.email,
      },
      bidCount: 0,
    };

    await mutateAsync({ jobInfo });
  };
  return (
    <div className="mt-5 md:mt-10 mb-10">
      <div className="text-center ">
        <h1 className="text-4xl lg:text-5xl font-bold mt-5 mb-3">Post a Job</h1>
        <p className="max-w-2xl mx-auto">
          Looking to hire? Post your job and connect with talented professionals
          who can bring your ideas to life!
        </p>
      </div>
      <div className="card max-w-2xl border bg-base-100 shrink-0 shadow-2xl mx-auto mt-7">
        <form onSubmit={handleSubmit(handleAddJob)} className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base">Job Title</span>
              </label>
              <input
                {...register("jobTitle", { required: true })}
                type="text"
                placeholder="Enter a descriptive job title (e.g., Frontend Developer)"
                className="input input-bordered"
              />
              {errors.jobTitle && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base">Your Email Address</span>
              </label>
              <input
                {...register("buyerEmail", { required: true })}
                type="email"
                placeholder="Your email address will appear here"
                className="input input-bordered"
                value={user?.email}
              />
              {errors.buyerEmail && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base">Deadline</span>
              </label>
              <input
                {...register("deadline", { required: true })}
                type="date"
                className="input input-bordered"
              />
              {errors.deadline && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base">Job Category</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a category for the job
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
              {errors.category && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base">Minimum Budget</span>
              </label>
              <input
                {...register("minPrice", { required: true })}
                type="number"
                placeholder="Enter the minimum budget for this job"
                className="input input-bordered"
              />
              {errors.minPrice && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base">Maximum Budget</span>
              </label>
              <input
                {...register("maxPrice", { required: true })}
                type="number"
                placeholder="Enter the maximum budget for this job"
                className="input input-bordered"
              />
              {errors.maxPrice && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control col-span-1 md:col-span-2">
              <label className="label">
                <span className="label-text text-base">Job Description</span>
              </label>
              <textarea
                {...register("description", { required: true })}
                type="text"
                placeholder="Provide a brief description of the job requirements"
                className="textarea textarea-bordered"
              />
              {errors.description && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-base-300">Post Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
