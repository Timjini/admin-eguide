import React from 'react';
import { useSelector } from'react-redux';
import Container from '@mui/material/Container'
import Logout from '../Authentication/Logout';
import {API_ROOT_PUBLIC} from '../constant';



export default function Profile () {
    const user = useSelector(state => state.user); 

    return (
        <Container sx={{marginTop:10}}>
            <div>
              <h2>User Details</h2>
              <p>Name: {user.user.avatar}</p>
              <p>Email: {user.user.email}</p>
              <img src={`${API_ROOT_PUBLIC}/uploads/${user.user.avatar}`} alt="User Avatar" />
            <Logout />
            </div>
        </Container>
    );

}