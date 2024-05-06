import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialValues, validateSchema } from "./FormValidation";
import { addToMyCourse } from "../../redux/courseSelectedReducer";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const ApplicationForm = (props) => {
  const { courseData, isApply, setIsApply, setIsSubmit } = props;

  const user = useSelector((state) => state?.user?.user);

  //const fieldType = courseData?.fieldType;
  // const sessionID = courseData?.sessionID;
  console.log("type", typeof courseData?.fieldType);
  console.log("user", user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("hi");
      navigate("/");
      addFieldTypeList();
      addMyCoursesList();
      //setIsApply(false);
      //setIsSubmit(true);
      dispatch(courseData);
      console.log("hi");
    },
    validationSchema: validateSchema,
  });

  const addFieldTypeList = async () => {
    console.log("data api1", user?.userID, courseData?.sessionID.toString());
    try {
      const response = await api.post(
        `/api/job-field-type/fieldTypeList/${courseData?.fieldType}/${user?.userID}`
      );
      console.log("response of field type", response?.data);
    } catch (err) {
      console.error(err);
    }
  };

  console.log("courseData", courseData);

  const addMyCoursesList = async () => {
    console.log("data api2", user?.userID, courseData?.fieldType);
    try {
      const response = await api.post(
        `/api/my-courses/sessionList/${user?.userID}/${courseData?.sessionID}`
      );

      console.log("response of field type", response?.data);
    } catch (err) {
      console.error(err);
    }
  };

  console.log("isapply", isApply);

  useEffect(() => {
    if (user) {
      formik?.setFieldValue("userID", user?.userID);
      formik?.setFieldValue("userEmail", user?.userEmail);
      formik?.setFieldValue("userFName", user?.userFName);
      formik?.setFieldValue("userLName", user?.userLName);
    }
  }, []);

  return (
    <>
      <Box sx={{ pt: 4 }}>
        <Typography sx={{ fontWeight: "bold" }}>
          Please fill in the details below to register for the programme
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          justifyContent: "center",
          py: 4,
        }}
        //   noValidate
        //   autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label={formik?.values?.userFName ? "" : "First Name"}
          variant="outlined"
          name="userFName"
          value={formik?.values?.userFName}
          onChange={formik?.handleChange}
          // sx={styles.inputField}
          helperText={
            formik?.errors?.userFName && formik?.touched?.userFName
              ? formik?.errors?.userFName
              : null
          }
          error={
            formik?.errors?.userFName && formik?.touched?.userFName
              ? formik?.errors?.userFName
              : null
          }
        />
        <TextField
          id="outlined-basic"
          label={formik?.values?.userLName ? "" : "Last Name"}
          variant="outlined"
          name="userLName"
          value={formik?.values?.userLName}
          onChange={formik?.handleChange}
          // sx={styles.inputField}
          helperText={
            formik?.errors?.userLName && formik?.touched?.userLName
              ? formik?.errors?.userLName
              : null
          }
          error={
            formik?.errors?.userLName && formik?.touched?.userLName
              ? formik?.errors?.userLName
              : null
          }
        />
        <TextField
          label={formik?.values?.userEmail ? "" : "Contact Email"}
          name="userEmail"
          value={formik?.values?.userEmail}
          onChange={formik?.handleChange}
          // sx={styles.inputField}
          helperText={
            formik?.errors?.userEmail && formik?.touched?.userEmail
              ? formik?.errors?.userEmail
              : null
          }
          error={
            formik?.errors?.userEmail && formik?.touched?.userEmail
              ? formik?.errors?.userEmail
              : null
          }
        />
      </Box>

      {isApply ? (
        <Grid
          sx={{
            my: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={formik?.handleSubmit}
          >
            Submit Application
          </Button>
        </Grid>
      ) : (
        <Typography>APPLICATION SUBMITTED SUCCESSFULLY</Typography>
      )}
    </>
  );
};

export default ApplicationForm;
