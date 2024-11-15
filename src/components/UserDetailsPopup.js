import React, { useState } from 'react';
import './UserDetailsPopup.css';

const UserDetailsPopup = ({ user, onClose, onEdit, onDelete, onCreate, isCreating }) => {
  const [isEditing, setIsEditing] = useState(isCreating);
  const [editedUser, setEditedUser] = useState(user);
  const [showPassword, setShowPassword] = useState(isCreating);

  if (!user) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCreating) {
      await onCreate(editedUser);
    } else {
      await onEdit(editedUser);
    }
    setIsEditing(false);
  };

  const renderEditForm = () => (
    <form onSubmit={handleSubmit} className="edit-form">
      <div className="form-section">
        <h3>Basic Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={editedUser.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Security</h3>
        {(!user.id || showPassword) && (
          <div className="form-row">
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={editedUser.password || ''}
                onChange={handleInputChange}
                required={!user.id}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={editedUser.confirmPassword || ''}
                onChange={handleInputChange}
                required={!user.id}
              />
            </div>
          </div>
        )}

        {user.id && !showPassword && (
          <button
            type="button"
            className="change-password-btn"
            onClick={() => setShowPassword(true)}
          >
            Change Password
          </button>
        )}
      </div>

      <div className="form-section">
        <h3>Contact & Role</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>User Type:</label>
            <select
              name="userType"
              value={editedUser.userType}
              onChange={handleInputChange}
              required
            >
              <option value="installer">Installer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="save-btn">
          {isCreating ? 'Create User' : 'Save Changes'}
        </button>
        <button 
          type="button" 
          className="cancel-btn"
          onClick={() => setIsEditing(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  const renderViewMode = () => (
    <>
      <div className="status-section">
        <div className={`user-type-badge ${user.userType}`}>
          {user.userType}
        </div>
        <div className="popup-actions">
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDelete(user.id)}>
            Delete
          </button>
        </div>
      </div>

      <div className="detail-section">
        <h3>User Information</h3>
        <div className="detail-grid">
          <div className="detail-item">
            <label>Username:</label>
            <span>@{user.username}</span>
          </div>
          <div className="detail-item">
            <label>Full Name:</label>
            <span>{user.fullName}</span>
          </div>
          <div className="detail-item">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div className="detail-item">
            <label>Created:</label>
            <span>{new Date(user.createdAt).toLocaleString()}</span>
          </div>
          {user.updatedAt && (
            <div className="detail-item">
              <label>Last Updated:</label>
              <span>{new Date(user.updatedAt).toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <div className="popup-header">
          <h2>{isCreating ? 'Create New User' : user.fullName}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="popup-body">
          {isEditing || isCreating ? renderEditForm() : renderViewMode()}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPopup; 