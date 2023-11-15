import React, { useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable';
import { useSelector } from 'react-redux';
import BreadCrumbs from '../components/BreadCrumbs';

export default function Dashboard(props) {
  const user = useSelector(state => state.user);
  

  if (user.type === 'admin') {
    return (
      <div className="p-4 sm:ml-64 text-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white" style={{height:'100vh'}}>
        <UsersTable />
      </div>
    );
  } else {
    return (
      <div className="p-4 sm:ml-64 text-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white" style={{height:'100vh'}}>
        <h3 class="py-5 text-2xl text-gray-700 dark:text-white"> Dashboard </h3>
      </div>
    
    );
  }
}
