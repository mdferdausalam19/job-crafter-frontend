import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCategoryCard from "./JobCategoryCard";
import axios from "axios";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const categories = ["Web Development", "Graphic Design", "Digital Marketing"];

const JobCategories = () => {

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_API_URL}/jobs`)
        .then((res) => res?.data)
        .catch(() =>
          toast.error("Failed to fetch jobs. Please try again later.")
        ),
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="mb-10 mt-14">
      <Tabs>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl font-semibold">Browse Jobs by Categories</h2>
          <p>
            Discover jobs tailored to your skills and interests. Explore
            opportunities in Web Development, Graphic Design, and Digital
            Marketing. Each category is designed to connect you with projects
            that match your expertise.
          </p>
        </div>
        <div className="flex justify-center items-center mb-4">
          <TabList>
            {categories.map((category) => (
              <Tab key={category}>{category}</Tab>
            ))}
          </TabList>
        </div>
        {categories.map((category) => (
          <TabPanel key={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {jobs
                .filter((job) => job.category === category)
                .map((job) => (
                  <JobCategoryCard key={job._id} job={job} />
                ))}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default JobCategories;
