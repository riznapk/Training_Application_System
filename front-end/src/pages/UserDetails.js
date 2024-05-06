import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/UserDetails.css";
import { addUserInfo } from "../redux/userDetailReducer";
import { Button } from "@mui/material";
import api from "../api/axiosConfig";

function UserDetails({ userEmail, userFName, userLName, userName }) {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    userEmail,
    userFName,
    userLName,
    userName,
  });

  //put request to update the db after editing the user details
  const updateUserDetails = async () => {
    console.log("hi");
    try {
      const response = await api.put(`/api/user/users/${user?.userID}`, user);
      console.log("response", response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    setEditedUser(user);
  }, []);

  const handleSaveClick = () => {
    updateUserDetails();
    dispatch(addUserInfo(editedUser));
    setIsEditing(false);
  };

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <p>
        Email:{" "}
        {isEditing ? (
          <input
            name="userEmail"
            value={editedUser.userEmail}
            onChange={handleInputChange}
          />
        ) : (
          editedUser?.userEmail || user?.userEmail || userEmail
        )}
      </p>
      <p>
        First Name:{" "}
        {isEditing ? (
          <input
            name="userFName"
            value={editedUser.userFName}
            onChange={handleInputChange}
          />
        ) : (
          editedUser?.userFName || user?.userFName || userFName
        )}
      </p>
      <p>
        Last Name:{" "}
        {isEditing ? (
          <input
            name="userLName"
            value={editedUser.userLName}
            onChange={handleInputChange}
          />
        ) : (
          editedUser?.userLName || user?.userLName || userLName
        )}
      </p>
      <p>
        Username:{" "}
        {isEditing ? (
          <input
            name="userName"
            value={editedUser.userName}
            onChange={handleInputChange}
          />
        ) : (
          editedUser?.userName || user?.userName || userName
        )}
      </p>
      {isEditing ? (
        <Button variant="contained" onClick={() => handleSaveClick()}>
          Save
        </Button>
      ) : (
        <Button variant="contained" onClick={handleEditClick}>
          Edit
        </Button>
      )}
    </div>
  );
}

export default UserDetails;
