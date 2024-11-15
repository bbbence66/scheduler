import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import './UserManagement.css';
import UserDetailsPopup from './UserDetailsPopup';

function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleCreateNew = () => {
    const newUser = {
      id: `USER-${Date.now()}`,
      username: '',
      password: '',
      userType: 'installer',
      fullName: '',
      email: '',
      createdAt: new Date().toISOString()
    };
    setSelectedUser(newUser);
    setIsCreating(true);
  };

  const handleEditFromPopup = async (editedUser) => {
    try {
      await userService.updateUser(editedUser.id, editedUser);
      await loadUsers();
      setSuccessMessage('User updated successfully!');
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user: ' + error.message);
    }
  };

  const handleDeleteFromPopup = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(userId);
        await loadUsers();
        setSelectedUser(null);
        setSuccessMessage('User deleted successfully!');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user: ' + error.message);
      }
    }
  };

  const handleCreateFromPopup = async (newUser) => {
    try {
      await userService.createUser(newUser);
      await loadUsers();
      setSuccessMessage('User created successfully!');
      setSelectedUser(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user: ' + error.message);
    }
  };

  return (
    <>
      <div className="user-management">
        <div className="user-management-header">
          <div className="header-left">
            <button 
              className="back-btn"
              onClick={() => navigate('/')}
            >
              ← Back
            </button>
            <h2>User Management</h2>
          </div>
          <button 
            className="create-user-btn"
            onClick={handleCreateNew}
          >
            Create New User
          </button>
        </div>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        <div className="users-list">
          {users.map(user => (
            <div 
              key={user.id} 
              className="user-item"
              onClick={() => setSelectedUser(user)}
            >
              <div className="user-item-header">
                <h4>{user.fullName}</h4>
                <span className={`user-type-badge ${user.userType}`}>
                  {user.userType}
                </span>
              </div>
              <p className="username">@{user.username}</p>
              <p className="email">{user.email}</p>
              <div className="user-meta-info">
                <div className="user-created">
                  Created: {new Date(user.createdAt).toLocaleDateString()}
                </div>
                {user.updatedAt && (
                  <div className="user-updated">
                    Updated: {new Date(user.updatedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedUser && (
        <UserDetailsPopup
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            setIsCreating(false);
          }}
          onEdit={handleEditFromPopup}
          onDelete={handleDeleteFromPopup}
          onCreate={handleCreateFromPopup}
          isCreating={isCreating}
        />
      )}
    </>
  );
}

export default UserManagement; 