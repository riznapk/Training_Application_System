import { Button, TextField, Typography, Grid } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import * as yup from "yup";

import api from "../api/axiosConfig";
import { addUserInfo } from "../redux/userDetailReducer";

const initialValues = {
  userName: "",
  password: "",
};

const schema = yup.object().shape({
  userName: yup.string().required("Email is required"),
  password: yup.string().required(),
});

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Formik Implementation
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      loginExistingUser();
    },
    validationSchema: schema,
  });

  // axios call to the backend to check for authenticated user
  const loginExistingUser = async () => {
    try {
      const response = await api.post("/api/user/login", {
        userName: formik?.values?.userName,
        password: formik?.values?.password,
      });

      if (response?.data != null) {
        dispatch(addUserInfo(response?.data));
        navigate("/");
      }
    } catch (err) {
      alert("Please enter a valid user name and password");
      console.log(err);
    }
  };

  return (
    <Grid container sx={styles.container}>
      <form onSubmit={formik.handleSubmit} style={styles.form}>
        <TextField
          type={formik.values.email}
          name="userName"
          label="User Name"
          variant="outlined"
          value={formik.values.userName}
          onChange={formik.handleChange}
          style={styles.input}
          onBlur={formik.handleBlur}
          error={formik?.errors.userName && formik?.touched.userName}
          helperText={
            formik?.errors.userName && formik?.touched.userName ? (
              <span style={styles.error}>{formik?.errors.userName}</span>
            ) : null
          }
        />
        <TextField
          name="password"
          value={formik.values.password}
          label="password"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik?.errors?.password && formik?.touched?.password}
          helperText={
            formik?.errors?.password && formik?.touched?.password ? (
              <span style={styles.error}>{formik?.errors.password}</span>
            ) : null
          }
          style={styles.input}
        />
        <Button
          type="submit"
          style={styles.button}
          onClick={formik?.handleSubmit}
        >
          Login
        </Button>
        <div style={styles.text}>
          <Typography>Don't have an account?</Typography>
          <Link to="/register" style={styles.link}>
            Register Here
          </Link>
        </div>
      </form>
    </Grid>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "10px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
  },
  input: {
    margin: "8px",
    width: "100%",
  },
  error: {
    color: "red",
  },
  button: {
    margin: "16px 0",
    backgroundColor: "#AA7575",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#AA7575",
    },
  },
  text: {
    display: "flex",
    alignItems: "center",
    marginTop: "16px",
  },
  link: {
    marginLeft: "8px",
    textDecoration: "none",
    color: "#0070f3",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};

export default Signin;
