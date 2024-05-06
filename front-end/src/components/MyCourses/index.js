import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/axiosConfig";
import MyCourseItem from "./MyCourseItem";

function MyCourses() {
  const user = useSelector((state) => state?.user?.user);
  const [courseIdList, setCourseIdList] = useState([]);
  const [courseDetailsList, setCourseDetailsList] = useState([]);

  //to get all the course ids a user has suscribed to
  const getAllCourseIdList = async () => {
    try {
      const response = await api.get(`/api/my-courses/${user?.userID}`);

      setCourseIdList(response.data);
      let detailsList = response.data;
      console.log("first", detailsList);
      const courseDetailsResponse = await api.get(
        `api/course-list/list/courses?sessionIDs=${detailsList}`
      );
      console.log("second", courseDetailsResponse?.data);
      setCourseDetailsList(courseDetailsResponse?.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("mycourseDetails lsit", courseDetailsList);

  console.log("user", user);
  useEffect(() => {
    getAllCourseIdList();
  }, [user?.userID]);

  return (
    <Fragment>
      {courseDetailsList?.map((courseListItem) => (
        <MyCourseItem
          key={courseListItem?.sessionID}
          getAllCourseIdList={getAllCourseIdList}
          data={{
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

export default MyCourses;
