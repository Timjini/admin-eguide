import React from 'react';
import { useSelector } from'react-redux';
import Container from '@mui/material/Container'
import Logout from '../Authentication/Logout';



export default function Profile () {
    const user = useSelector(state => state.user); 

    return (
        <Container sx={{ m: 5 }}>
            <div>
              <h2>User Details</h2>
              <p>Name: {user.user.avatar}</p>
              <p>Email: {user.user.email}</p>
              <img src={`http://localhost:4000/uploads/${user.user.avatar}`} alt="User Avatar" />
            <Logout />
            </div>
        </Container>
    );

}