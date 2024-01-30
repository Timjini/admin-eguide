import React,{useState, useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { useSelector } from'react-redux';
import {API_ROOT} from '../../constant';
import MainDrawer from '../../components/OffCanvas/MainDrawer';
import CreateAgencyOwner from '../postRequests/createAgencyOwner';
import BackButton from '../../components/Buttons/BackButton';


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
    
        fetch(`${API_ROOT}/users/users`, requestOptions)
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
        id: user.id, 
        name: user.username,
        email: user.email,
        phone: user.phone,
        type:user.type
    }));
    
    const columns = [
        {field: 'id', headerName: 'id', width: 200},
        {field: 'name', headerName: 'Name', width: 200},
        {field: 'email', headerName: 'Email', width: 200},
        {field: 'phone', headerName: 'Phone', width: 200},
        {field: 'type', headerName: 'Type', width: 200}
    ];

    return(
        <div className='p-4 flex flex-col content-wrapper' >
        <div  className='flex justify-between'>
        <BackButton />
       <MainDrawer activeDrawer="right" title="Add A User" additionalComponent={CreateAgencyOwner} />
       </div>
        <Container sx={{marginTop:10}} className=''>
        <div>
        <h2 className='mb-4 text-xl'>Users List</h2>
       </div>
            <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            />
        </Container>
        </div>
    )
}