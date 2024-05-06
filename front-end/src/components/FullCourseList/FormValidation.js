import * as Yup from "yup";

export const initialValues = {
  userID: "",
  userFName: "",
  userLName: "",
  userEmail: "",
};

const emailRegEx = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const phoneNumberRegEx =
  /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
export const validateSchema = Yup.object().shape({
  userID: Yup.string().required("This is required"),
  userFName: Yup.string().required("This is required"),
  userLName: Yup.string().required("This is required"),
  // phoneNumber: Yup.string()
  //   .required("This is required")
  //   .matches(phoneNumberRegEx, "Invalid phone number"),
  userEmail: Yup.string()
    .required("This is required")
    .matches(emailRegEx, "Invalid email"),
});
