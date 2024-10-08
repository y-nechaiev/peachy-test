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
  max-width: 400px;
  background-color: #f9f9f9;
  max-height: 542px;
`;

const StyledInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 380px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const StyledTextarea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  width: 380px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const UserProfileForm = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  const [profileData, setProfileData] = useState({
    age: '',
    address: '',
  });

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users', {
        name: userData.name,
        email: userData.email,
        age: profileData.age,
        address: profileData.address
      });
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <h2>User Information</h2>
        <StyledInput
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleUserChange}
          required
        />
        <StyledInput
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleUserChange}
          required
        />

        <h2>User Profile</h2>
        <StyledInput
          type="number"
          name="age"
          placeholder="Age"
          value={profileData.age}
          onChange={handleProfileChange}
          required
        />
        <StyledTextarea
          name="address"
          placeholder="address"
          value={profileData.address}
          onChange={handleProfileChange}
          rows="4"
          required
        />

        <StyledButton type="submit">Submit</StyledButton>
      </form>
    </FormContainer>
  );
};

export default UserProfileForm;
