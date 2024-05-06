import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/axiosConfig";

function MyCourseItem(props) {
  const { data, getAllCourseIdList } = props;

  const user = useSelector((state) => state?.user?.user);

  // to delete that perticular course id from the list
  const deleteCourseFromList = async () => {
    try {
      const response = await api.delete(
        `/api/my-courses/users/${user?.userID}/sessions/${data?.sessionID}`
      );
      console.log("response", response?.data);
      getAllCourseIdList();
      alert(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        my: 4,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          {data?.sessionName}
        </Typography>
        <Typography variant="body2"> {data?.sessionDescription}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {`Starts on: ${data?.sessionStartDate} | Ends on: ${data?.sessionEndDate} `}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">
          In Progress
        </Button>

        <Button variant="outlined" onClick={() => deleteCourseFromList()}>
          Drop Session
        </Button>
      </CardActions>
    </Card>
  );
}

export default MyCourseItem;
