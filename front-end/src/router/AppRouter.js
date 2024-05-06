import React from "react";
import { Routes, Route } from "react-router-dom";
import CourseDetails from "../components/FullCourseList/CourseDetails";
import CourseLists from "../components/FullCourseList/CourseLists";
import Header from "../components/Header";
import MyCourses from "../components/MyCourses";
import HomePage from "../pages/HomePage";
import PageNotFound from "../pages/PageNotFound";
import Register from "../pages/Register";
import Signin from "../pages/SignIn";
import UserDetails from "../pages/UserDetails";

import { URLData } from "./PageUrls";

const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<HomePage />}></Route>
        <Route path={"/signin"} element={<Signin />}></Route>
        <Route
          path={URLData.courseDetails.url}
          element={<CourseDetails />}
        ></Route>
        <Route path={URLData.courses.url} element={<CourseLists />}></Route>
        <Route path={URLData.myCourses.url} element={<MyCourses />}></Route>
        <Route path={"/register"} element={<Register />}></Route>
        <Route path={"/userDetails"} element={<UserDetails />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
};

export default AppRouter;
