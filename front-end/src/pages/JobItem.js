import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

const JobItem = (props) => {
  const { jobDetails } = props;

  const card = (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Card sx={{ minWidth: 300 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {jobDetails?.jobTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {jobDetails?.jobCompany}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Prerequisites: {jobDetails?.preRequisites}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Salary Range: {jobDetails?.salaryRange}
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 1 }}
          >
            <Button
              variant="contained"
              href={jobDetails?.applyLink}
              target="_blank"
            >
              Apply
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 500 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {jobDetails?.jobDescription}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box sx={{ minWidth: 350, margin: "15px" }}>
      <Card
        variant="outlined"
        sx={{ flex: 1, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}
      >
        {card}
      </Card>
    </Box>
  );
};

export default JobItem;
