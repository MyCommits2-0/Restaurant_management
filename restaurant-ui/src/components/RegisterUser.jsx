import React, { useState } from 'react';
import UserService from '../services/UserService';

const RegisterUser = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    userRole: 'CUSTOMER', 
    subscriptionAmount: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.registerUser(user);
      setMessage('User registered successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('Registration failed: ' + error.response?.data?.message || 'Check form fields.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={user.firstName} onChange={handleChange} className="mb-2 w-full p-2 border" required />
        <input type="text" name="lastName" placeholder="Last Name" value={user.lastName} onChange={handleChange} className="mb-2 w-full p-2 border" required />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} className="mb-2 w-full p-2 border" required />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} className="mb-2 w-full p-2 border" required />
        <input type="date" name="dob" value={user.dob} onChange={handleChange} className="mb-2 w-full p-2 border" required />
        
        <select name="userRole" value={user.userRole} onChange={handleChange} className="mb-2 w-full p-2 border">
          <option value="CUSTOMER">Customer</option>
          <option value="OWNER">Owner</option>
        </select>

        <input type="number" name="subscriptionAmount" placeholder="Subscription Amount" value={user.subscriptionAmount} onChange={handleChange} className="mb-2 w-full p-2 border" required />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default RegisterUser;
