import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import JobItem from "./JobItem";

const JobApplication = () => {
  const [jobData, setJobData] = useState([]);

  const getAllJobListing = async () => {
    try {
      const response = await api.get("/api/job-list");
      setJobData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const JobApplication = async () => {
  //   try {
  //     const response = await api.get(`/api/job-field-type/list/${user?.userID}`);

  //     setCourseIdList(response.data);
  //     let detailsList = response.data;
  //     console.log("first", detailsList);
  //     const courseDetailsResponse = await api.get(
  //       `api/course-list/list/courses?sessionIDs=${detailsList}`
  //     );
  //     console.log("second", courseDetailsResponse?.data);
  //     setCourseDetailsList(courseDetailsResponse?.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    getAllJobListing();
  }, []);

  return (
    <div>
      <Grid sx={{ my: 2 }}>
        <Typography variant="h6">
          Explore the oppertunities that might interest you.
        </Typography>
        {jobData?.map((jobItem) => (
          <JobItem
            key={jobItem?.jobID}
            id={jobItem?.jobID}
            jobDetails={{
              jobID: jobItem?.jobID,
              jobTitle: jobItem?.jobTitle,
              jobCompany: jobItem?.jobCompany,
              applyLink: jobItem?.applyLink,
              fieldType: jobItem?.fieldType,
              preRequisites: jobItem?.preRequisites,
              jobDescription: jobItem?.jobDescription,
              salaryRange: jobItem?.salaryRange,
            }}
          />
        ))}
      </Grid>
    </div>
  );
};

export default JobApplication;
