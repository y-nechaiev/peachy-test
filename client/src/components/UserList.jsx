import React, { useState, useEffect } from 'react';
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
  max-height: 542px;
  overflow-y: scroll;
  overflow-x: hidden;
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
  margin-top: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;

const RefreshButton = styled.button`
  padding: 10px;
  margin-bottom: 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <FormContainer>
      <h2>Users List</h2>
      <RefreshButton onClick={fetchUsers}>Refresh List</RefreshButton>
      {users.length === 0 ? (
        <p>No users available</p>
      ) : (
        users.map(user => (
          <UserCard key={user.id}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.profile && (
              <>
                <p><strong>Age:</strong> {user.profile.age}</p>
                <p><strong>Address:</strong> {user.profile.address}</p>
              </>
            )}
            <StyledButton onClick={() => handleDelete(user.id)}>Delete User</StyledButton>
          </UserCard>
        ))
      )}
    </FormContainer>
  );
};

export default UserList;
