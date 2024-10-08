import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 400px;
  background-color: #f9f9f9;
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`;

const StyledButton = styled.button`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => (props.error ? 'red' : '#ccc')};
  border-radius: 4px;
  background-color: ${(props) => (props.error ? '#ffe6e6' : 'white')};
`;

const UserDetails = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [inputErrors, setInputErrors] = useState({ name: false, email: false, age: false, address: false });

  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      const { name, email, profile } = response.data;
      setUser(response.data);
      setName(name);
      setEmail(email);
      if (profile) {
        setAge(profile.age);
        setAddress(profile.address);
      }
      setError('');
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('User not found');
      setUser(null);
    }
  };

  const validateInputs = () => {
    const errors = {
      name: !name.trim(),
      email: !email.trim(),
      age: !age || isNaN(age),  
      address: !address.trim(),
    };

    setInputErrors(errors);

    return !Object.values(errors).some((isError) => isError);
  };

  const handleUpdate = async () => {
    if (validateInputs()) {
      try {
        const updatedData = { name, email, age, address };
        const response = await axios.put(`http://localhost:3000/users/${userId}`, updatedData);
        setUser(response.data);
        alert('User information updated successfully');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleSearch = () => {
    if (userId) {
      fetchUserById(userId);
    } else {
      setError('Please enter a user ID');
    }
  };

  return (
    <FormContainer>
      <h2>Search User by ID</h2>
      <Input
        type="text"
        placeholder="Enter user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <StyledButton onClick={handleSearch}>Search User</StyledButton>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <UserCard>
          <label>Name:</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={inputErrors.name}
          />

          <label>Email:</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={inputErrors.email}
          />

          <label>Age:</label>
          <Input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            error={inputErrors.age}
          />

          <label>Address:</label>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={inputErrors.address}
          />

          <StyledButton onClick={handleUpdate}>Update User</StyledButton>
        </UserCard>
      )}
    </FormContainer>
  );
};

export default UserDetails;
