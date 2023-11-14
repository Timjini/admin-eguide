import React, { useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable';
import { useSelector } from 'react-redux';
import Graph from '../dashboard/Graph';

export default function Dashboard(props) {
  const user = useSelector(state => state.user);
  

  if (user.type === 'admin') {
    return (
      <div className="p-4 sm:ml-64 bg-gray-50 dark:bg-gray-900">
        <UsersTable />
      </div>
    );
  } else {
    return (
      <div className="p-4 sm:ml-64 bg-gray-50 dark:bg-gray-900">
        <h1> Dashboard </h1>
      </div>
    
    );
  }
}
