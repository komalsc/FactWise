import React, { useState } from "react";
import "./Main.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import initialData from "./data"; // Renamed to `initialData` for clarity

const Main = () => {
  const [data, setData] = useState(initialData);
  const [openId, setOpenId] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const toggleDetails = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((user) => user.id !== id);
    setData(updatedData);
  };

  const handleEditClick = (user) => {
    setIsEditing(user.id);
    setEditedUser(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    const updatedData = data.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    setData(updatedData);
    setIsEditing(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setEditedUser({});
  };

  return (
    <div className="container">
      {data.map((user) => (
        <div key={user.id} className="box">
          <div className="box-header" onClick={() => toggleDetails(user.id)}>
            <img
              src={user.picture}
              alt={`${user.first} ${user.last}`}
              className="user-image"
            />
            <div className="user-info">
              <h2>
                {user.first} {user.last}
              </h2>
              <button className="toggle-button">
                {openId === user.id ? "▲" : "▼"}
              </button>
            </div>
          </div>
          {openId === user.id && (
            <div className="box-content">
              {isEditing === user.id ? (
                <div className="edit-form">
                  <div className="para-item">
                    <label className="label">First Name:</label>
                    <input
                      type="text"
                      name="first"
                      value={editedUser.first}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="para-item">
                    <label className="label">Last Name:</label>
                    <input
                      type="text"
                      name="last"
                      value={editedUser.last}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="para-item">
                    <label className="label">Email:</label>
                    <input
                      type="text"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="para-item">
                    <label className="label">Country:</label>
                    <input
                      type="text"
                      name="country"
                      value={editedUser.country}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="para-item">
                    <label className="label">Date of Birth:</label>
                    <input
                      type="date"
                      name="dob"
                      value={editedUser.dob}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="para-item">
                    <label className="label">Description:</label>
                    <textarea
                      name="description"
                      value={editedUser.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="edit-buttons">
                    <button onClick={handleSave} className="save-button">
                      Save
                    </button>
                    <button onClick={handleCancel} className="cancel-button">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="para-container">
                    <div className="para-item">
                      <span className="label">Email:</span>
                      <span className="value">{user.email}</span>
                    </div>
                    <div className="para-item">
                      <span className="label">Country:</span>
                      <span className="value">{user.country}</span>
                    </div>
                    <div className="para-item">
                      <span className="label">Date of Birth:</span>
                      <span className="value">{user.dob}</span>
                    </div>
                  </div>
                  <br />
                  <div className="para-item">
                    <span className="label1">Description:</span>
                    <span className="value">{user.description}</span>
                  </div>
                  <div className="action-buttons">
                    {
                      <DeleteIcon
                        onClick={() => handleDelete(user.id)}
                        className="delete-button"
                      />
                    }
                    {
                      <ModeEditOutlineIcon
                        onClick={() => handleEditClick(user)}
                        className="edit-button"
                      />
                    }
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Main;
