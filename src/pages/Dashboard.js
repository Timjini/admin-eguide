import React, { useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable';
import { useSelector } from'react-redux';


export default function Dashboard(props) {
  const user = useSelector(state => state.user); 


    if (user.type === 'admin') {
      return(
      <div class="p-4 sm:ml-64">
        <UsersTable />
      </div>
      );
    } else {
      return(
        <div class="p-4 sm:ml-64">
          <h2>Dashboard</h2>
        </div>
      );
    }
  }
