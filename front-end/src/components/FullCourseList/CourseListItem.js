import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia, Grid, IconButton } from "@mui/material";
import courseImage from "../../assets/images/course.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";

import "../../styles/CourseListItem.css";
import { useNavigate } from "react-router-dom";
import { URLData } from "../../router/PageUrls";

import { useDispatch } from "react-redux";
import { addCourseDetails } from "../../redux/courseSelectedReducer";

const CourseListItem = (props) => {
  const { sessionDetails } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLearnMore = () => {
    dispatch(addCourseDetails(sessionDetails));
    navigate(`/courses/${sessionDetails?.sessionID}`);
  };

  const card = (
    <React.Fragment>
      <CardMedia
        component="img"
        alt="green iguana"
        height="300"
        image={courseImage}
        sx={{
          textAlign: "center",
          textOverflow: "ellipsis",
          fontSize: "18px",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {sessionDetails?.sessionName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {sessionDetails?.sessionDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites" color="primary">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share" color="primary">
          <ShareIcon />
        </IconButton>
        <Button onClick={handleLearnMore}>Learn More</Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: 30 }}>
      <Box sx={{ margin: "30px" }}>
        <Card
          variant="outlined"
          sx={{ flex: 1, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}
        >
          {card}
        </Card>
      </Box>
    </Grid>
  );
};

export default CourseListItem;
