import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CourseLists from "../components/FullCourseList/CourseLists";
import MyCourses from "../components/MyCourses";
import JobApplication from "./JobApplication";

const HomePage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box sx={{ m: 5, display: "flex" }}>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>SKILL UP</Tab>
          <Tab>MY COURSES</Tab>
          <Tab>LEVEL UP</Tab>
        </TabList>

        <TabPanel>
          <CourseLists />
        </TabPanel>

        <TabPanel>
          <MyCourses />
        </TabPanel>

        <TabPanel>
          <JobApplication />
        </TabPanel>
      </Tabs>
    </Box>
  );
};

export default HomePage;
