import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser, addUser } from '../api';
import '../css/UserDetails.css';
import AddUserForm from './AddUserForm'; // Import AddUserForm component

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditFormData({
      username: user.username,
      email: user.email,
    });
  };

  const handleUpdateUser = async (userId) => {
    try {
      const updatedUser = await updateUser(userId, editFormData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? updatedUser : user))
      );
      setEditingUser(null);
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditFormData({
      username: '',
      email: '',
    });
  };

  const handleAddUser = async (userData) => {
    try {
      const newUser = await addUser(userData);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      console.log('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <input
                    type="text"
                    name="username"
                    value={editFormData.username}
                    onChange={handleEditFormChange}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser && editingUser._id === user._id ? (
                  <>
                    <button onClick={() => handleUpdateUser(user._id)}>Update</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                )}
                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-user-form-container">
        <h2>Add New User</h2>
        <AddUserForm onAddUser={handleAddUser} />
      </div>
    </div>
  );
};

export default UserDetails;
