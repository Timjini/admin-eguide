import React, { useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable';
import { useSelector } from'react-redux';


export default function Dashboard(props) {
  const user = useSelector(state => state.user); 


    if (user.type === 'admin') {
      return(
        <div>

        <UsersTable />
      </div>
      );
    } else {
      return(
        <div>
          <h2>Dashboard</h2>
        </div>
      );
    }
  }
