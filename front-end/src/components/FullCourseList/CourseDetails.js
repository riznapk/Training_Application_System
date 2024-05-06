import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ApplicationForm from "./ApplicationForm";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box } from "@mui/system";

const CourseDetails = () => {
  const [isApply, setIsApply] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const courseData = useSelector(
    (state) => state?.courseDetails?.courseSelectedDetails
  );

  return (
    <Card sx={{ margin: 20, p: 5 }}>
      <Button onClick={() => navigate(-1)}>
        <ArrowBackIosIcon /> BACK
      </Button>
      {/* <CardMedia component="img" image={imageUrl} alt="Image" /> */}
      <CardContent>
        <Typography
          variant="h4"
          color="textSecondary"
          component="p"
          sx={{ pb: 1 }}
        >
          {courseData?.sessionName}
        </Typography>

        <Typography component="p" sx={{ pb: 1 }}>
          {courseData?.sessionDescription}
        </Typography>
        <Typography component="p" sx={{ pb: 1 }}>
          Session sessionDuration : {courseData?.sessionDuration} hrs
        </Typography>
        <Typography component="p" sx={{ pb: 1 }}>
          Session Instructor : {courseData?.sessionInstructor}
        </Typography>
        <Typography component="p" sx={{ pb: 1 }}>
          Location : {courseData?.location}
        </Typography>
        <Typography component="p" sx={{ pb: 1 }}>
          Start Date : {courseData?.sessionStartDate}
        </Typography>
        <Typography component="p" sx={{ pb: 1 }}>
          End Date : {courseData?.sessionEndDate}
        </Typography>

        {/* Module Section */}

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Modules and Topics</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{courseData?.sessionModules}</Typography>
          </AccordionDetails>
        </Accordion>

        {isApply && (
          <ApplicationForm
            courseData={courseData}
            isApply={isApply}
            setIsApply={setIsApply}
            setIsSubmit={setIsSubmit}
          />
        )}

        {!isApply && (
          <Button
            variant="contained"
            color="primary"
            sx={{
              my: 2,
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
            onClick={() => setIsApply(true)}
          >
            Apply Now
          </Button>
        )}

        {/* {!isApply && setIsSubmit && (
          <Box
            sx={{
              my: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "red",
            }}
          >
            <Typography>Application submitted successfully</Typography>
          </Box>
        )} */}
      </CardContent>
    </Card>
  );
};

export default CourseDetails;
