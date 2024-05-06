import { Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";
import CourseListItem from "./CourseListItem";
import { useState, useEffect } from "react";

import { courseListData } from "../../assets/data/courseData";
import api from "../../api/axiosConfig";

function CourseLists() {
  const [data, setData] = useState([]);

  const getCourseList = async () => {
    try {
      const response = await api.get("/api/course-list");
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCourseList();
  }, []);

  return (
    <Fragment>
      {data.map((courseListItem) => (
        <CourseListItem
          key={courseListItem?.sessionID}
          id={courseListItem?.sessionID}
          sessionDetails={{
            sessionID: courseListItem?.sessionID,
            sessionName: courseListItem?.sessionName,
            sessionDescription: courseListItem?.sessionDescription,
            sessionInstructor: courseListItem?.sessionInstructor,
            sessionDuration: courseListItem?.sessionDuration,
            sessionLevel: courseListItem?.sessionLevel,
            sessionLocation: courseListItem?.sessionLocation,
            sessionStartDate: courseListItem?.sessionStartDate,
            sessionEndDate: courseListItem?.sessionEndDate,
            sessionModules: courseListItem?.sessionModules,
            fieldType: courseListItem?.fieldType,
            imageURL: courseListItem?.imageURL,
          }}
        />
      ))}
    </Fragment>
  );
}

export default CourseLists;
