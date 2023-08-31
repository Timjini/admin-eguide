import React,{useState, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { useSelector } from'react-redux';



export default function UsersTable(){

    const user = useSelector(state => state.user); 

    const [users, setUsers] = useState([]);

    console.log(user.user.authToken);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Adjust the content type as needed
                'Authorization': `Bearer ${user.user.authToken}` // Replace with your actual authorization token
                // Add any other headers you need
            }
        };
    
        fetch('http://localhost:4000/api/users/users', requestOptions)
          .then(res => res.json())
          .then(data => {
            console.log(data); // Log the fetched data
            setUsers(data); // Update the state with fetched data
          })
          .catch(error => {
            console.error('Error fetching users:', error); // Log any fetch errors
          });
    }, []);
    
    


    const rows = users.map(user => ({
        id: user.id, // Make sure user.id is a unique identifier for each user
        name: user.username,
        email: user.email,
        phone: user.phone
    }));
    
    const columns = [
        {field: 'id', headerName: 'id', width: 200},
        {field: 'name', headerName: 'Name', width: 200},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'phone', headerName: 'Phone', width: 200},
    ];

    return(
        <Container sx={{marginTop:10}}>
            <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            />
        </Container>
    )
}