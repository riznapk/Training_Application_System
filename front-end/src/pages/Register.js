import { Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import api from "../api/axiosConfig";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../redux/userDetailReducer";

const initialValues = {
  userName: "",
  password: "",
  userFName: "",
  userLName: "",
  userEmail: "",
  passwordConfirm: "",
};

const uuid = uuidv4();

const schema = yup.object().shape({
  userFName: yup.string().required("Required"),
  userLName: yup.string().required("Required"),
  password: yup.string().required("Required"),
  userName: yup.string().required("Required"),
  //userEmail: yup.string().required("Required"),
  passwordConfirm: yup.string().required("Required"),
  userEmail: yup.string().required("Required").email("Email is invalid"),
  password: yup.string().required(),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      addNewUserOnRegister();
      dispatch(
        addUserInfo({
          ...values,
          userID: uuid,
        })
      );
    },
    validationSchema: schema,
  });

  const addNewUserOnRegister = async () => {
    try {
      const response = await api.post("/api/user/register", {
        ...formik?.values,
        userID: uuid,
      });

      if (response?.data == "success") {
        alert("Account created");
        navigate("/");
      } else if (response?.data == "User already exist") {
        alert("The account already exist");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid
      container
      height="100vh"
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          backgroundColor: "#f2f2f2",
          borderRadius: "10px",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid item>
          <TextField
            //type={formik.values.email}
            id="email"
            label="First Name"
            variant="outlined"
            sx={{ m: 2 }}
            name="userFName"
            value={formik?.values?.userFName}
            onChange={formik?.handleChange}
            // sx={styles.inputField}
            helperText={
              formik?.errors?.userFName && formik?.touched?.userFName
                ? formik?.errors?.empIuserFNameD
                : null
            }
            error={
              formik?.errors?.userFName && formik?.touched?.userFName
                ? formik?.errors?.userFName
                : null
            }
          />
          <TextField
            //type={formik.values.email}
            name="userLName"
            label="Last Name"
            variant="outlined"
            sx={{ m: 2 }}
            value={formik.values.userLName}
            onChange={formik.handleChange}
            // style={styles.input}
            onBlur={formik.handleBlur}
            error={formik?.errors.userLName && formik?.touched.userLName}
            helperText={
              formik?.errors.userLName && formik?.touched.userLName ? (
                <span>{formik?.errors.email}</span>
              ) : null
            }
          />
        </Grid>
        <Grid item>
          <TextField
            //type={formik.values.email}
            name="userName"
            label="User Name"
            variant="outlined"
            sx={{ m: 2 }}
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik?.errors.userName && formik?.touched.userName}
            helperText={
              formik?.errors.userName && formik?.touched.userName ? (
                <span>{formik?.errors.userName}</span>
              ) : null
            }
          />
          <TextField
            //type={formik.values.email}
            name="userEmail"
            label="Email"
            variant="outlined"
            sx={{ m: 2 }}
            value={formik.values.userEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik?.errors.userEmail && formik?.touched.userEmail}
            helperText={
              formik?.errors.email && formik?.touched.email ? (
                <span>{formik?.errors.userEmail}</span>
              ) : null
            }
          />
        </Grid>
        <Grid item>
          <TextField
            //type={formik.values.email}
            name="password"
            label="Password"
            variant="outlined"
            sx={{ m: 2 }}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik?.errors.password && formik?.touched.password}
            helperText={
              formik?.errors.password && formik?.touched.password ? (
                <span>{formik?.errors.password}</span>
              ) : null
            }
          />
          <TextField
            //type={formik.values.email}
            name="passwordConfirm"
            label="Confirm Password"
            variant="outlined"
            sx={{ m: 2 }}
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik?.errors.passwordConfirm && formik?.touched.passwordConfirm
            }
            helperText={
              formik?.errors.passwordConfirm &&
              formik?.touched.passwordConfirm ? (
                <span>{formik?.errors.passwordConfirm}</span>
              ) : null
            }
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={formik?.handleSubmit}
          >
            Register
          </Button>
          <Typography>
            Already a member? <Link to="/signin">SignIn Here</Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
