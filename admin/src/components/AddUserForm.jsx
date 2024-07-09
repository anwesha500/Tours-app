import React, { useState } from 'react';
import '../css/AddUserForm.css'; // Make sure this path is correct and matches your file structure

const AddUserForm = ({ onAddUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { username, email, password };
      await onAddUser(newUser);
      setUsername(''); // Reset form fields
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <form className="add-user-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
