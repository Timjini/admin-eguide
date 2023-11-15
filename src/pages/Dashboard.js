import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminDashboard from '../dashboard/AdminDashboard';
import AgencyAdminDashboard from '../dashboard/AgencyAdminDashboard';
import MemberDashboard from '../dashboard/MemberDashboard';

export default function Dashboard(props) {
  const user = useSelector(state => state.user.user);

  console.log(user.type)

  switch (user.type) { 
    case 'admin':
      return <AdminDashboard  user={user}/>;
    case 'owner':
      return <AgencyAdminDashboard user={user} />;
    default:
      return <MemberDashboard  user={user}/>;
  }

}
