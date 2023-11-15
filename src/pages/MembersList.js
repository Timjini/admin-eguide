import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UsersTable from '../admin/UsersTable'
import MembersList from '../agency/MembersList';
import MemberDashboard from '../dashboard/MemberDashboard';
import AddMember from '../agency/AddMember';

export default function Dashboard(props) {
  const user = useSelector(state => state.user.user);

  console.log(user.type)

  switch (user.type) { 
    case 'admin':
      return <UsersTable  user={user}/>;
    case 'owner':
      return (
        <><MembersList user={user} /></>

      )
      ;
    default:
      return <MemberDashboard  user={user}/>;
  }

}
