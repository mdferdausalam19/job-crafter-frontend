import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCategoryCard from "./JobCategoryCard";

const JobCategories = () => {
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
        <div className="flex justify-center items-center">
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphic Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>

        <TabPanel>
          <JobCategoryCard></JobCategoryCard>
        </TabPanel>
        <TabPanel>
          <JobCategoryCard></JobCategoryCard>
        </TabPanel>
        <TabPanel>
          <JobCategoryCard></JobCategoryCard>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default JobCategories;
